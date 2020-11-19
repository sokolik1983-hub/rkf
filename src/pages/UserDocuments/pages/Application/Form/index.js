import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import Card from "components/Card";
import FormInput from "components/kendo/Form/FormInput";
import FormContactsCheckbox from "components/kendo/Form/FormContactsCheckbox";
import FormUpload from "components/kendo/Form/FormUpload";
import FormDatePicker from "components/kendo/Form/FormDatePicker";
import FormDropDownList from "components/kendo/Form/FormDropDownList";
import FormTextArea from "components/kendo/Form/FormTextArea";
import DocumentLink from "../../../components/DocumentLink";
import DocumentLinksArray from "../../../components/DocumentLinksArray";
import LightTooltip from "components/LightTooltip";
import {
    dateRequiredValidator, nameRequiredValidator,
    documentRequiredValidator,
    requiredWithTrimValidator,
    documentTypeRequired
} from "components/kendo/Form/validators";
import { Request } from "../../../../../utils/request";
import { getHeaders } from "utils/request";
import "./index.scss";

const Application = ({ alias, history, status }) => {
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [disableFields, setDisableFields] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [values, setValues] = useState(null);
    const [documentTypes, setDocumentTypes] = useState({ id: [], documents: [] });
    const [formProps, setFormProps] = useState(null);
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [initialValues, setInitialValues] = useState({
        declarant_name: ls.get('user_info') ? ls.get('user_info').name : '',
        is_foreign_owner: false,
        express: false,
        payment_date: '',
        payment_number: '',
        payment_document_id: '',
        payment_name: ls.get('user_info') ? ls.get('user_info').name : '',
        comment: '',
        document_type_id: 0,
        rkf_document_type_id: 0,
        payment_document: [],
        documents: []
    });

    useEffect(() => {
        getDocumentTypes();
    }, []);

    useEffect(() => {
        if (status) {
            const paramsArr = history.location.pathname.split('/');
            const id = paramsArr[paramsArr.length - 1];

            (() => Request({
                url: `/api/requests/get_rkf_document_request/ownergetrkfdocumentrequest?id=${id}`
            }, data => {
                let values = {};
                Object.keys(initialValues).forEach(key => {
                    values[key] = data[key] || initialValues[key];
                });
                setValues(data);
                setInitialValues(values);
            }, error => {
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

    const getDocumentTypes = async (pedigreeNumber, changeDogName) => {
        await Request({
            url: `/api/requests/commonrequest/rkf_document_types`
        }, data => {
            if (data) {
                setDocumentTypes({
                    id: data.id.map(d => ({ text: d.name, value: d.id })),
                    documents: data.documents.map(d => ({ text: d.name, value: d.id }))
                });
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
        let newData = {
            ...data,
            payment_document_id: formProps.valueGetter('payment_document')[0].id
        };

        delete newData.declarant_name;
        delete newData.document_type_id;
        delete newData.payment_document;

        if (status === 'edit') {
            newData.id = values.id;
            //if (!payment_document) newData.payment_document_id = values.payment_document_id;
            //if (!veterinary_contract_document) newData.veterinary_contract_document_id = values.veterinary_contract_document_id;
        }

        await Request({
            url: '/api/requests/get_rkf_document_request/ownergetrkfdocumentrequest',
            method: status === 'edit' ? 'PUT' : 'POST',
            data: JSON.stringify(newData)
        }, () => {
            setSuccess('Заявка отправлена на рассмотрение');
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };

    const handleChange = (name) => {
        formProps.onChange(name, { value: formProps.valueGetter(name) ? false : true })
    }

    const onAdd = (event) => {
        const { newState } = event;
        newState.length > 20
            ? setDocumentsOverflow(true)
            : formProps.onChange('documents', { value: newState })
    }

    const onRemove = (event) => {
        const { newState } = event;
        newState.length <= 20 && setDocumentsOverflow(false);
        formProps.onChange('documents', { value: newState })
    }

    const onProgress = (event, name) => formProps.onChange(name, { value: event.newState });

    const onBeforeUpload = (e, type) => {
        e.headers = getHeaders(true);
        e.additionalData = { document_type_id: type };
    };

    const onStatusChange = (event, name) => {
        const { newState, affectedFiles, response } = event;
        if (response) {
            const updatedNewState = newState.map(d => d.uid === affectedFiles[0].uid ? ({ ...d, id: response?.response?.result?.id }) : d);
            console.log(updatedNewState);
            formProps.onChange(name, { value: updatedNewState });
        } else {
            formProps.onChange(name, { value: newState });
        }
    }

    return (
        <div className="application-form">
            <Card>
                <div className="user-documents__breadcrumbs">
                    <Link to={`/user/${alias}/documents`} className="user-documents__breadcrumbs-link">Личный
                        кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Заявка на получение документов РКФ</span>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    key={JSON.stringify(initialValues)}
                    render={formRenderProps => {
                        if (!formProps) setFormProps(formRenderProps);
                        return (<FormElement>
                            <div className="application-form__content">
                                {values && values.rejected_comment &&
                                    <p className="application-form__danger">{values.rejected_comment}</p>
                                }
                                <h4 className="application-form__title" style={{ marginBottom: 0 }}>Добавление заявки</h4>
                                <div className="application-form__row-is-foreign">
                                    <div>
                                        <Field
                                            id="declarant_name"
                                            name="declarant_name"
                                            label="Ответственное лицо"
                                            component={FormInput}
                                            disabled={true}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            id="is_foreign_owner"
                                            name="is_foreign_owner"
                                            label="Владелец является иностранным гражданином"
                                            component={FormContactsCheckbox}
                                            onChange={handleChange}
                                            disabled={disableAllFields}
                                        />
                                    </div>
                                </div>
                                <div className="application-form__row row">
                                    <Field
                                        id="express"
                                        name="express"
                                        label="Срочное изготовление"
                                        component={FormContactsCheckbox}
                                        onChange={handleChange}
                                        disabled={disableAllFields}
                                    />
                                </div>
                                <div className="application-form__row row">
                                    <div className="col-6">
                                        <Field
                                            id="document_type_id"
                                            name="document_type_id"
                                            label="Выберите тип документа"
                                            component={FormDropDownList}
                                            data={documentTypes.id}
                                            defaultItem={{ text: "Не выбран", value: 0 }}
                                            validator={disableAllFields ? '' : documentTypeRequired}
                                            disabled={disableAllFields}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Field
                                            id="rkf_document_type_id"
                                            name="rkf_document_type_id"
                                            label="Документ"
                                            component={FormDropDownList}
                                            data={documentTypes.documents}
                                            defaultItem={{ text: "Не выбран", value: 0 }}
                                            validator={documentTypeRequired}
                                            disabled={disableAllFields}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="application-form__content">
                                <h4 className="application-form__title">Документы</h4>
                                {!!status && <DocumentLinksArray documents={formRenderProps.valueGetter('documents')} status={status} />}
                                {!disableAllFields &&
                                    <div>
                                        При загрузке файлов постарайтесь&nbsp;
                                    <LightTooltip title="Инструкция: конвертирование и объединение файлов" enterDelay={200} leaveDelay={200}>
                                            <a href="https://help.rkf.online/ru/knowledge_base/art/72/cat/3/konvertirovanie-i-obyedinenie-fajlov-dlja-podachi-obraschenij-na-platforme-rkfonline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="application-form__how-to-link"
                                            >объединить их в один файл</a>
                                        </LightTooltip>.
                                </div>
                                }

                                {!disableAllFields &&
                                    <div className="application-form__file">
                                        <Field
                                            id="documents"
                                            name="documents"
                                            fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                            component={FormUpload}
                                            saveUrl={'/api/requests/get_rkf_document/ownergetrkfdocumentrequestdocument'}
                                            saveField="document"
                                            multiple={true}
                                            showActionButtons={documentsOverflow ? false : true}
                                            onAdd={onAdd}
                                            onRemove={onRemove}
                                            onBeforeUpload={e => onBeforeUpload(e, 27)}
                                            onStatusChange={(e) => onStatusChange(e, 'documents')}
                                            onProgress={(e) => onProgress(e, 'documents')}
                                            validator={() => documentRequiredValidator(formProps?.valueGetter('documents').find(d => d.id))}
                                        />
                                        {values &&
                                            values.veterinary_contract_document_id &&
                                            !formRenderProps.valueGetter('veterinary_contract_document').length &&
                                            <DocumentLink docId={values.veterinary_contract_document_id} />
                                        }
                                        {documentsOverflow && <div id="documents_error" role="alert" class="k-form-error k-text-start">
                                            Вы не можете добавить больше 20 документов
                                            </div>}
                                    </div>
                                }
                            </div>

                            <div className="application-form__content">
                                <h4 className="application-form__title">Информация о платеже</h4>
                                {!disableAllFields &&
                                    <p>Приложите квитанцию об оплате заявки и заполните информацию о платеже.</p>
                                }
                                <div className="application-form__row">
                                    {disableAllFields && values &&
                                        <div className="application-form__file">
                                            <p className="k-label">Квитанция об оплате (PDF, JPEG, JPG, PNG)</p>
                                            <DocumentLink docId={values.payment_document_id} />
                                        </div>
                                    }
                                    {!disableAllFields &&
                                        <div className="application-form__file">
                                            <Field
                                                id="payment_document"
                                                name="payment_document"
                                                fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                                component={FormUpload}
                                                saveUrl={'/api/requests/get_rkf_document/ownergetrkfdocumentrequestdocument'}
                                                saveField="document"
                                                multiple={false}
                                                showActionButtons={true}
                                                onBeforeUpload={e => onBeforeUpload(e, 5)}
                                                onStatusChange={(e) => onStatusChange(e, 'payment_document')}
                                                onProgress={(e) => onProgress(e, 'payment_document')}
                                                validator={() => documentRequiredValidator(formProps?.valueGetter('payment_document').find(d => d.id))}
                                            />
                                            {values &&
                                                values.payment_document_id &&
                                                !formRenderProps.valueGetter('payment_document').length &&
                                                <DocumentLink docId={values.payment_document_id} />
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="application-form__row _payment-info">
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
                                        validator={value => nameRequiredValidator(value, 150)}
                                        disabled={disableAllFields}
                                    />
                                </div>
                                <div className="application-form__row">
                                    <Field
                                        id="comment"
                                        name="comment"
                                        label="Комментарий к заявке"
                                        maxLength={500}
                                        component={FormTextArea}
                                        disabled={disableAllFields}
                                    />
                                </div>
                            </div>

                            <div className="application-form__controls">
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
                    alignItems: 'flex-start',
                    flexWrap: 'wrap-reverse'
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
        </div>
    )
};

export default React.memo(Application);