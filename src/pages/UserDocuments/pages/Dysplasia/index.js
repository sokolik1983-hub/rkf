import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ls from "local-storage";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import {Fade} from "@progress/kendo-react-animation";
import {Notification, NotificationGroup} from "@progress/kendo-react-notification";
import Card from "../../../../components/Card";
import FormInput from "../../../../components/kendo/Form/FormInput";
import FormUpload from "../../../../components/kendo/Form/FormUpload";
import FormDatePicker from "../../../../components/kendo/Form/FormDatePicker";
import FormTextArea from "../../../../components/kendo/Form/FormTextArea";
import DocumentLink from "../../components/DocumentLink";
import {
    dateRequiredValidator, nameRequiredValidator,
    requiredValidator,
    requiredWithTrimValidator
} from "../../../../components/kendo/Form/validators";
import {Request} from "../../../../utils/request";
import flatten from "../../../../utils/flatten";
import "./index.scss";


const DysplasiaForm = ({alias, history, status}) => {
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [disableFields, setDisableFields] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [values, setValues] = useState(null);
    const [initialValues, setInitialValues] = useState({
        declarant_name: ls.get('user_info') ? ls.get('user_info').name : '',
        veterinary_contract_document: [],
        pedigree_number: '',
        dog_name: '',
        roentgenogram_document: [],
        payment_document: [],
        payment_date: '',
        payment_number: '',
        payment_name: ls.get('user_info') ? ls.get('user_info').name : '',
        comment: ''
    });

    useEffect(() => {
        if(status) {
            const paramsArr = history.location.pathname.split('/');
            const id = paramsArr[paramsArr.length - 1];

            (() => Request({
                url: `/api/requests/dog_health_check_request/ownerdoghealthcheckdysplasiarequest?id=${id}`
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

            if(status === 'view') setDisableAllFields(true);
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
            if(data) {
                setDisableFields(true);
                setError('');
                changeDogName('dog_name', {value: data.name});
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
        const roentgenogram_document = data.roentgenogram_document.length ? data.roentgenogram_document[0].getRawFile() : null;
        const veterinary_contract_document = data.veterinary_contract_document.length ? data.veterinary_contract_document[0].getRawFile() : null;

        let newData = {...data, veterinary_contract_document, roentgenogram_document, payment_document};
        delete newData.declarant_name;

        if(status === 'edit') {
            newData.id = values.id;
            if(!payment_document) newData.payment_document_id = values.payment_document_id;
            if(!roentgenogram_document) newData.roentgenogram_document_id = values.roentgenogram_document_id;
            if(!veterinary_contract_document) newData.veterinary_contract_document_id = values.veterinary_contract_document_id;
        }

        newData = flatten(newData);

        const formData = new FormData();
        Object.keys(newData).forEach(key => formData.append(key, newData[key]));

        await Request({
            url: '/api/requests/dog_health_check_request/ownerdoghealthcheckdysplasiarequest',
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

    return (
        <div className="dysplasia-form">
            <Card>
                <div className="user-documents__breadcrumbs">
                    <Link to={`/user/${alias}/documents`} className="user-documents__breadcrumbs-link">Личный
                        кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Сертификат о проверке на дисплазию</span>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    key={JSON.stringify(initialValues)}
                    render={formRenderProps =>
                        <FormElement>
                            <div className="dysplasia-form__content">
                                {values && values.rejected_comment &&
                                    <p className="dysplasia-form__danger">{values.rejected_comment}</p>
                                }
                                <h4 className="dysplasia-form__title" style={{marginBottom: 0}}>
                                    {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                </h4>
                                <div className="dysplasia-form__row">
                                    <Field
                                        id="declarant_name"
                                        name="declarant_name"
                                        label="Ответственное лицо"
                                        component={FormInput}
                                        disabled={true}
                                    />
                                </div>
                                <div className="dysplasia-form__row _files">
                                    {disableAllFields && values &&
                                        <>
                                            <div className="dysplasia-form__file">
                                                <p className="k-label">Заполненный договор-заявка с печатью ветеринарного учреждения и подписью ветеринарного врача (PDF, JPEG, JPG, PNG)</p>
                                                <DocumentLink docId={values.veterinary_contract_document_id}/>
                                            </div>
                                            <div className="dysplasia-form__file">
                                                <p className="k-label">Рентгенограмма (PDF, JPEG, JPG, PNG)</p>
                                                <DocumentLink docId={values.roentgenogram_document_id}/>
                                            </div>
                                        </>
                                    }
                                    {!disableAllFields &&
                                        <>
                                            <div className="dysplasia-form__file">
                                                <Field
                                                    id="veterinary_contract_document"
                                                    name="veterinary_contract_document"
                                                    label="Заполненный договор-заявка с печатью ветеринарного учреждения и подписью ветеринарного врача (PDF, JPEG, JPG, PNG)"
                                                    fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                                    component={FormUpload}
                                                    validator={requiredValidator}
                                                />
                                                {values &&
                                                values.veterinary_contract_document_id &&
                                                !formRenderProps.valueGetter('veterinary_contract_document').length &&
                                                    <DocumentLink docId={values.veterinary_contract_document_id} />
                                                }
                                            </div>
                                            <div className="dysplasia-form__file">
                                                <Field
                                                    id="roentgenogram_document"
                                                    name="roentgenogram_document"
                                                    label="Рентгенограмма (PDF, JPEG, JPG, PNG)"
                                                    fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                                    component={FormUpload}
                                                    validator={requiredValidator}
                                                />
                                                {values &&
                                                values.roentgenogram_document_id &&
                                                !formRenderProps.valueGetter('roentgenogram_document').length &&
                                                    <DocumentLink docId={values.roentgenogram_document_id} />
                                                }
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="dysplasia-form__row">
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
                                                formRenderProps.onChange('pedigree_number', {value: ''});
                                                formRenderProps.onChange('dog_name', {value: ''});
                                                setDisableFields(false);
                                            }}
                                        >Удалить
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className="dysplasia-form__content">
                                <h4 className="dysplasia-form__title">Информация о платеже</h4>
                                {!disableAllFields &&
                                    <p>Приложите квитанцию об оплате заявки и заполните информацию о платеже.</p>
                                }
                                <div className="dysplasia-form__row">
                                    {disableAllFields && values &&
                                        <div className="dysplasia-form__file">
                                            <p className="k-label">Квитанция об оплате (PDF, JPEG, JPG, PNG)</p>
                                            <DocumentLink docId={values.payment_document_id}/>
                                        </div>
                                    }
                                    {!disableAllFields &&
                                        <div className="dysplasia-form__file">
                                            <Field
                                                id="payment_document"
                                                name="payment_document"
                                                label="Квитанция об оплате (PDF, JPEG, JPG, PNG)"
                                                fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                                component={FormUpload}
                                                validator={requiredValidator}
                                            />
                                            {values &&
                                            values.payment_document_id &&
                                            !formRenderProps.valueGetter('payment_document').length &&
                                                <DocumentLink docId={values.payment_document_id} />
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="dysplasia-form__row _payment-info">
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
                                {!disableAllFields &&
                                    <div className="dysplasia-form__row">
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
                            <div className="dysplasia-form__controls">
                                {!disableAllFields &&
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!formRenderProps.modified || !formRenderProps.valid || disableSubmit}
                                    >Отправить
                                    </button>
                                }
                            </div>
                        </FormElement>
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
                            type={{style: 'success', icon: true}}
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
                            type={{style: 'error', icon: true}}
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

export default React.memo(DysplasiaForm);