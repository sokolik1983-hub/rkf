import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import Card from "../../../../components/Card";
import FormInput from "../../../../components/kendo/Form/FormInput";
import FormUpload from "../../../../components/kendo/Form/FormUpload";
import FormDatePicker from "../../../../components/kendo/Form/FormDatePicker";
import FormTextArea from "../../../../components/kendo/Form/FormTextArea";
import FormContactsCheckbox from "../../../../components/kendo/Form/FormContactsCheckbox";
import DocumentLink from "../../../../components/DocumentLink";
import {
    dateRequiredValidator,
    nameRequiredValidator,
    requiredValidator,
    requiredWithTrimValidator,
    documentRequiredValidatorTypeArray
} from "../../../../components/kendo/Form/validators";
import { Request } from "../../../../utils/request";
import flatten from "../../../../utils/flatten";
import FooterFeedback from "../../../../components/Layouts/FooterFeedback";

import "./index.scss";

const apiPrivacyEndpoint = '/api/requests/dog_health_check_request/ownerdoghealthcheckpatellarequest/personal_data_document';
const apiPatellaDocsEndpoint = '/api/requests/dog_health_check_request/doghealthcheckdocument';

const PatellaForm = ({ alias, history, owner, status }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [privacyHref, setPrivacyHref] = useState('');
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [disableFields, setDisableFields] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [values, setValues] = useState(null);
    const [initialValues, setInitialValues] = useState({
        express: false,
        declarant_name: !status && owner ? (owner.last_name + ' ' + owner.first_name + (owner.second_name !== null ? (' ' + owner.second_name) : '')) : '',
        veterinary_contract_document: [],
        pedigree_number: '',
        dog_name: '',
        personal_data_document: [],
        pedigree_document: [],
        payment_document: [],
        payment_date: '',
        payment_number: '',
        payment_name: !status && owner ? (owner.last_name + ' ' + owner.first_name + (owner.second_name !== null ? (' ' + owner.second_name) : '')) : '',
        comment: ''
    });

    useEffect(() => {
        Promise.all([
            fetch(apiPrivacyEndpoint, { headers })
                .then(response => response.blob())
                .then(data => setPrivacyHref(URL.createObjectURL(data))),
        ])
    }, []);

    useEffect(() => {
        if (status) {
            const paramsArr = history.location.pathname.split('/');

            const id = paramsArr[paramsArr.length - 1];

            (() => Request({
                url: `/api/requests/dog_health_check_request/ownerdoghealthcheckpatellarequest?id=${id}`
            }, data => {
                let values = {};
                Object.keys(initialValues).forEach(key => {
                    values[key] = data[key] || initialValues[key];
                });
                setValues(data);
                setInitialValues(values);
            }, error => {
                console.log(error);
                history.replace('/404');
            }))();

            if (status === 'view') setDisableAllFields(true);
        }
    }, [status]);

    const handleError = e => {
        if (e.response) {
            const message = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setError(message);
            !error && setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    const getDogName = async (pedigreeNumber, changeDogName) => {
        await Request({
            url: `/api/dog/Dog/everk_dog/${pedigreeNumber}`
        }, data => {
            if (data) {
                setDisableFields(true);
                setError('');
                changeDogName('dog_name', { value: data.name });
            } else {
                setError('Номер родословной не найден в базе ВЕРК');
            }
        }, error => {
            handleError(error);
        });
    };

    const handleSubmit = async data => {
        setDisableSubmit(true);
        setDisableFields(false);

        const payment_document = data.payment_document.length ? data.payment_document[0].getRawFile() : null;
        const veterinary_contract_document = data.veterinary_contract_document.length ? data.veterinary_contract_document[0].getRawFile() : null;
        const personal_data_document = data.personal_data_document.length ? data.personal_data_document[0].getRawFile() : null;
        const pedigree_document = data.pedigree_document.length ? data.pedigree_document[0].getRawFile() : null;

        let newData = { ...data, veterinary_contract_document, payment_document, pedigree_document, personal_data_document };
        delete newData.declarant_name;

        if (status === 'edit') {
            newData.id = values.id;
            if (!payment_document) newData.payment_document_id = values.payment_document_id;
            if (!veterinary_contract_document) newData.veterinary_contract_document_id = values.veterinary_contract_document_id;
            if (!personal_data_document) newData.personal_data_document = values.personal_data_document;
            if (!pedigree_document) newData.pedigree_document = values.pedigree_document;
        }

        newData = flatten(newData);

        const formData = new FormData();
        Object.keys(newData).forEach(key => formData.append(key, newData[key]));

        await Request({
            url: '/api/requests/dog_health_check_request/ownerdoghealthcheckpatellarequest',
            method: status === 'edit' ? 'PUT' : 'POST',
            data: formData,
            isMultipart: true
        }, () => {
            history.push(`/user/${alias}/documents`);
        }, error => {
            handleError(error);
        });

        setDisableSubmit(false);
    };

    const handleValidator = (value) => {
        const maxLength = 150;
        return nameRequiredValidator(value, maxLength);
    };

    return (
        <div className="patella-form">
            <Card>
                <div className="user-documents__breadcrumbs">
                    <Link to={`/user/${alias}/documents`} className="user-documents__breadcrumbs-link">Личный
                        кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Сертификат клинической оценки коленных суставов (PL) (Пателла)</span>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    key={JSON.stringify(initialValues)}
                    render={formRenderProps => {

                        const handleChange = name => {
                            formRenderProps.onChange(name, { value: !formRenderProps.valueGetter(name) });
                        };

                        return (
                            <FormElement>
                                <div className="patella-form__content">
                                    {values && values.rejected_comment &&
                                        <p className="patella-form__danger">{values.rejected_comment}</p>
                                    }
                                    <h4 className="patella-form__title" style={{ marginBottom: 0, marginTop: '10px' }}>
                                        {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                    </h4>
                                    <div className="patella-form__row">
                                        <Field
                                            id="express"
                                            name="express"
                                            label="Срочное изготовление"
                                            component={FormContactsCheckbox}
                                            onChange={handleChange}
                                            disabled={disableAllFields || status === 'edit'}
                                        />
                                    </div>
                                    <div className="patella-form__row">
                                        <Field
                                            id="declarant_name"
                                            name="declarant_name"
                                            label="Ответственное лицо"
                                            component={FormInput}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="patella-form__row">
                                        {disableAllFields && values &&
                                            <div>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div className="patella-form__file">
                                                        <p className="k-label">Заполненный договор-заявка с печатью ветеринарного учреждения и подписью ветеринарного врача (PDF, JPEG, JPG)</p>
                                                        <DocumentLink
                                                            docId={values.veterinary_contract_document_id}
                                                            endpoint={apiPatellaDocsEndpoint}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="patella-form__inner">
                                                    {values.pedigree_document_id && <div className="patella-form__file" style={{ marginRight: '50px' }}>
                                                        <p className="k-label">Соглашение на обработку персональных данных</p>
                                                        <DocumentLink
                                                            docId={values.pedigree_document_id}
                                                            endpoint={apiPatellaDocsEndpoint}
                                                        />
                                                    </div>}
                                                    {values.personal_data_document_id &&
                                                        <div>
                                                            <p className="k-label">Родословная</p>
                                                            <DocumentLink
                                                                docId={values.personal_data_document_id}
                                                                endpoint={apiPatellaDocsEndpoint}
                                                            />
                                                        </div>}
                                                </div>
                                            </div>
                                        }
                                        {!disableAllFields &&
                                            <div>
                                                <Field
                                                    id="veterinary_contract_document"
                                                    name="veterinary_contract_document"
                                                    label="Заполненный договор-заявка с печатью ветеринарного учреждения и подписью ветеринарного врача (PDF, JPEG, JPG)"
                                                    fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                    component={FormUpload}
                                                    validator={status === 'edit' ? '' : documentRequiredValidatorTypeArray}
                                                />
                                                {values &&
                                                    values.veterinary_contract_document_id &&
                                                    !formRenderProps.valueGetter('veterinary_contract_document').length &&
                                                    <DocumentLink
                                                        docId={values.veterinary_contract_document_id}
                                                        endpoint={apiPatellaDocsEndpoint}
                                                    />
                                                }

                                            </div>
                                        }
                                    </div>
                                    {!disableAllFields && <div className="dysplasia-form__row _files">
                                        <div className="dysplasia-form__file">
                                            <Field
                                                id="personal_data_document"
                                                name="personal_data_document"
                                                label={<div>Соглашение на обработку персональных данных (PDF, JPEG, JPG)<br /><a href={privacyHref} style={{ textDecoration: 'none' }}>Скачать форму соглашения</a></div>}
                                                fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                component={FormUpload}
                                                disabled={status === 'edit' && values && values.personal_data_document_accept}
                                                validator={status === 'edit' ? '' : documentRequiredValidatorTypeArray}
                                            />
                                            {values &&
                                                values.personal_data_document_id &&
                                                !formRenderProps.valueGetter('personal_data_document').length &&
                                                <DocumentLink
                                                    docId={values.personal_data_document_id}
                                                    endpoint={apiPatellaDocsEndpoint}
                                                />
                                            }
                                        </div>
                                        <div className="dysplasia-form__file">
                                            <Field
                                                id="pedigree_document"
                                                name="pedigree_document"
                                                label="Загрузите родословную (PDF, JPEG, JPG)"
                                                fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                component={FormUpload}
                                                disabled={status === 'edit' && values && values.pedigree_document_accept}
                                                validator={status === 'edit' ? '' : documentRequiredValidatorTypeArray}
                                            />
                                            {values &&
                                                values.pedigree_document_id &&
                                                !formRenderProps.valueGetter('pedigree_document').length &&
                                                <DocumentLink
                                                    docId={values.pedigree_document_id}
                                                    endpoint={apiPatellaDocsEndpoint}
                                                />
                                            }
                                        </div>
                                    </div>}
                                    <div className="patella-form__row">
                                        <Field
                                            id="pedigree_number"
                                            name="pedigree_number"
                                            label="№ родословной собаки"
                                            hint="Допускается ввод только цифр"
                                            maxLength={30}
                                            onlyNumbers={true}
                                            disabled={disableAllFields || disableFields}
                                            component={FormInput}
                                            validator={requiredValidator}
                                        />
                                        {!disableAllFields && !disableFields &&
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => getDogName(
                                                    formRenderProps.valueGetter('pedigree_number'),
                                                    formRenderProps.onChange
                                                )}
                                                disabled={!formRenderProps.valueGetter('pedigree_number')}
                                            >Поиск
                                        </button>
                                        }
                                        <Field
                                            id="dog_name"
                                            name="dog_name"
                                            label="Кличка собаки"
                                            disabled={disableAllFields || disableFields}
                                            component={FormInput}
                                            validator={requiredValidator}
                                        />
                                        {!disableAllFields && disableFields &&
                                            <button
                                                type="button"
                                                className="btn btn-red"
                                                onClick={() => {
                                                    formRenderProps.onChange('pedigree_number', { value: '' });
                                                    formRenderProps.onChange('dog_name', { value: '' });
                                                    setDisableFields(false);
                                                }}
                                            >Удалить
                                        </button>
                                        }
                                    </div>
                                </div>
                                <div className="patella-form__content">
                                    <h4 className="patella-form__title">Информация о платеже</h4>
                                    {!disableAllFields &&
                                        <>
                                            <p style={{ marginBottom: '10px' }}>Приложите квитанцию об оплате заявки и заполните информацию о платеже.</p>
                                            <p>Обращаем Ваше внимание, что платежи могут обрабатываться банком 2-3 дня. При формировании срочной заявки старайтесь произвести платёж заблаговременно.</p>
                                        </>
                                    }
                                    <div className="patella-form__row">
                                        {disableAllFields && values &&
                                            <div className="patella-form__file">
                                                <p className="k-label">Квитанция об оплате (PDF, JPEG, JPG)</p>
                                                <DocumentLink
                                                    docId={values.payment_document_id}
                                                    endpoint={apiPatellaDocsEndpoint}
                                                />
                                            </div>
                                        }
                                        {!disableAllFields &&
                                            <div className="patella-form__file">
                                                <Field
                                                    id="payment_document"
                                                    name="payment_document"
                                                    label="Квитанция об оплате (PDF, JPEG, JPG)"
                                                    fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                    component={FormUpload}
                                                    validator={status === 'edit' ? '' : documentRequiredValidatorTypeArray}
                                                />
                                                {values &&
                                                    values.payment_document_id &&
                                                    !formRenderProps.valueGetter('payment_document').length &&
                                                    <DocumentLink
                                                        docId={values.payment_document_id}
                                                        endpoint={apiPatellaDocsEndpoint}
                                                    />
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="patella-form__row _payment-info">
                                        <Field
                                            id="payment_date"
                                            name="payment_date"
                                            label="Дата оплаты"
                                            max={new Date()}
                                            component={FormDatePicker}
                                            validator={dateRequiredValidator}
                                            disabled={disableAllFields}
                                        />
                                        <Field
                                            id="payment_number"
                                            name="payment_number"
                                            label="Номер платежного документа"
                                            cutValue={30}
                                            component={FormInput}
                                            validator={requiredWithTrimValidator}
                                            disabled={disableAllFields}
                                        />
                                        <Field
                                            id="payment_name"
                                            name="payment_name"
                                            label="ФИО плательщика"
                                            cutValue={150}
                                            component={FormInput}
                                            maxLength={150}
                                            validator={handleValidator}
                                            disabled={disableAllFields}
                                        />
                                    </div>
                                    {!disableAllFields &&
                                        <div className="patella-form__row">
                                            <Field
                                                id="comment"
                                                name="comment"
                                                label="Комментарий к заявке"
                                                maxLength={500}
                                                component={FormTextArea}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="patella-form__controls">
                                    {!disableAllFields &&
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!formRenderProps.modified || !formRenderProps.valid || disableSubmit}
                                        >Отправить
                                    </button>
                                    }
                                </div>
                            </FormElement>)
                    }
                    }
                />
            </Card>
            <NotificationGroup
                style={{
                    position: 'absolute',
                    right: '1vh',
                    top: '80vh',
                }}
            >
                <Fade enter={true} exit={true}>
                    {success &&
                        <Notification
                            type={{ style: 'success', icon: true }}
                            closable={true}
                            onClose={() => setSuccess('')}
                        >
                            <span>{success}</span>
                        </Notification>
                    }
                </Fade>
                <Fade enter={true} exit={true}>
                    {error &&
                        <Notification
                            type={{ style: 'error', icon: true }}
                            closable={true}
                            onClose={() => setError('')}
                        >
                            <span>{error}</span>
                        </Notification>
                    }
                </Fade>
            </NotificationGroup>
            <FooterFeedback />
        </div>
    )
};

export default React.memo(PatellaForm);