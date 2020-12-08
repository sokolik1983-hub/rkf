import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import Loading from "../../../../../components/Loading";
import Card from "../../../../../components/Card";
import LightTooltip from "../../../../../components/LightTooltip";
import FormInput from "../../../../../components/kendo/Form/FormInput";
import FormContactsCheckbox from "../../../../../components/kendo/Form/FormContactsCheckbox";
import FormUpload from "./components/FormUpload";
import FormDatePicker from "../../../../../components/kendo/Form/FormDatePicker";
import FormDropDownList from "../../../../../components/kendo/Form/FormDropDownList";
import FormTextArea from "../../../../../components/kendo/Form/FormTextArea";
import DocumentLink from "../../DocumentLink";
import DocumentLinksArray from "../../DocumentLinksArray";
import {
    dateRequiredValidator, nameRequiredValidator,
    documentRequiredValidator, requiredWithTrimValidator,
    documentTypeRequired, innValidator, requiredValidator, nameValidator
} from "../../../../../components/kendo/Form/validators";
import { Request } from "../../../../../utils/request";
import { getHeaders } from "../../../../../utils/request";
import ruMessages from "../../../../../kendoMessages.json"
import "./index.scss";


loadMessages(ruMessages, 'ru');


const Application = ({ alias, history, status }) => {
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableOwner, setDisableOwner] = useState(true);
    const [disableFields, setDisableFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isForeignPedigree, setIsForeignPedigree] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [values, setValues] = useState(null);
    const [owner, setOwner] = useState(null);
    const [declarants, setDeclarants] = useState([]);
    const [documentTypes, setDocumentTypes] = useState({ id: [], documents: [] });
    const [documentTypeIds, setDocumentTypeIds] = useState([]);
    const [formProps, setFormProps] = useState(null);
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [initialValues, setInitialValues] = useState({
        declarant_id: 0,
        is_foreign_owner: false,
        owner_last_name: '',
        owner_first_name: '',
        owner_second_name: '',
        express: false,
        pedigree_number: '',
        dog_name: '',
        is_foreign_pedigree: false,
        payment_date: '',
        payment_number: '',
        payment_document_id: '',
        payment_name: '',
        inn: '',
        comment: '',
        document_type_id: 0,
        rkf_document_type_id: 0,
        payment_document: [],
        documents: []
    });
    const editable = !status || status === 'edit';

    useEffect(() => {
        if (!status) {
            Promise.all([getOwner(), getDocumentTypes(), getDeclarants()]).then(() => setLoaded(true));
        }
    }, []);

    useEffect(() => {
        if (status) {
            const paramsArr = history.location.pathname.split('/');
            const id = paramsArr[paramsArr.length - 1];

            (() => Request({
                url: `/api/requests/get_rkf_document_request/kennelgetrkfdocumentrequest?id=${id}`
            }, data => {
                let values = {};
                Object.keys(initialValues).forEach(key => {
                    values[key] = data[key] || initialValues[key];
                });
                if (data.documents) {
                    values.documents = [];
                }
                if(data.is_foreign_pedigree) {
                    setIsForeignPedigree(true);
                }
                setValues(data);
                setInitialValues(values);
                if (!values.owner_last_name) {
                    getOwner();
                }
                setLoaded(true);
            }, error => {
                history.replace('/404');
            }))();

            setDisableAllFields(true);
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

    const getOwner = async () => {
        await Request({
            url: `/api/nurseries/Nursery/pedigree_request_information`
        }, data => {
            if (data) {
                setOwner(data);

                setInitialValues({
                    ...initialValues,
                    owner_last_name: data.owner_last_name,
                    owner_first_name: data.owner_first_name,
                    owner_second_name: data.owner_second_name || ''
                });
            } else {
                setError('Ошибка');
            }
        }, error => {
            handleError(error);
        });
    };

    const getDocumentTypes = async () => {
        await Request({
            url: `/api/requests/commonrequest/rkf_document_types`
        }, data => {
            if (data) {
                setDocumentTypes({
                    ...documentTypes,
                    id: data.id.map(d => ({ text: d.name, value: d.id })),
                    documents: data.documents.map(d => ({ text: d.name, value: d.id, document_type_id: d.document_type_id }))
                });
            } else {
                setError('Ошибка');
            }
        }, error => {
            handleError(error);
        });
    };

    const getDeclarants = async () => {
        await Request({
            url: `/api/nurseries/nurserydeclarant/nursery_declarants`
        }, data => {
            if (data) {
                setDeclarants(data.map(declarant => ({text: declarant.full_name, value: declarant.id})));
            } else {
                setError('Ошибка');
            }
        }, error => {
            handleError(error);
        });
    };

    const handleSubmit = async data => {
        const paymentId = formProps.valueGetter('payment_document')[0]?.id;
        setDisableSubmit(true);
        let newData = {
            ...data,
            payment_document_id: paymentId ? paymentId : data.payment_document_id
        };

        newData.payment_date = moment(newData.payment_date).format("YYYY-MM-DD");

        delete newData.declarant_name;
        delete newData.document_type_id;
        delete newData.payment_document;

        if (status === 'edit') {
            newData.id = values.id;
            if (values.documents) {
                newData.documents = [
                    ...values.documents,
                    ...formProps.valueGetter('documents')
                ];
            }
        }

        await Request({
            url: '/api/requests/get_rkf_document_request/kennelgetrkfdocumentrequest',
            method: status === 'edit' ? 'PUT' : 'POST',
            data: JSON.stringify(newData)
        }, () => {
            history.push(`/kennel/${alias}/documents`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
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

    const handleChange = name => {
        if(name === 'is_foreign_owner') {
            const isForeign = !formProps.valueGetter(name);

            formProps.onChange('owner_last_name', {value:
                    !isForeign && owner ? owner.owner_last_name :
                    values && values.owner_last_name ? values.owner_last_name :
                    ''
            });
            formProps.onChange('owner_first_name', {value:
                    !isForeign && owner ? owner.owner_first_name :
                    values && values.owner_first_name ? values.owner_first_name:
                    ''
            });
            formProps.onChange('owner_second_name', {value:
                    !isForeign && owner && owner.owner_second_name ? owner.owner_second_name:
                    values && values.owner_second_name ? values.owner_second_name :
                    ''
            });

            setDisableOwner(!isForeign);
        }

        if(name === 'is_foreign_pedigree') {
            const isForeign = !formProps.valueGetter(name);

            formProps.onChange('pedigree_number', {value: ''});

            formProps.onChange('dog_name', {value: ''});

            setDisableFields(false);
            setIsForeignPedigree(isForeign);
        }

        formProps.onChange(name, { value: !formProps.valueGetter(name) })
    };

    const onAdd = event => {
        const { newState } = event;
        if (status === 'edit') {
            (values.documents?.length + newState.length) > 20
                ? setDocumentsOverflow(true)
                : formProps.onChange('documents', { value: newState })
        } else {
            newState.length > 20
                ? setDocumentsOverflow(true)
                : formProps.onChange('documents', { value: newState })
        }
    };

    const onRemove = event => {
        const { newState } = event;
        newState.length <= 20 && setDocumentsOverflow(false);
        formProps.onChange('documents', { value: newState })
    };

    const onProgress = (event, name) => formProps.onChange(name, { value: event.newState });

    const onBeforeUpload = (e, type) => {
        e.headers = getHeaders(true);
        e.additionalData = { document_type_id: type };
    };

    const onStatusChange = (event, name) => {
        const { newState, affectedFiles, response } = event;
        if (response) {
            const updatedNewState = newState.map(d => d.uid === affectedFiles[0].uid ? ({ ...d, id: response?.response?.result?.id }) : d);
            formProps.onChange(name, { value: updatedNewState });
        } else {
            formProps.onChange(name, { value: newState });
        }
    };

    const handleDocTypeChange = docType => {
        const { value } = docType;
        setDocumentTypeIds(documentTypes.documents.filter(d => d.document_type_id === value));
        formProps.onChange('document_type_id', { value: docType });
        formProps.onChange('rkf_document_type_id', { value: 0 });
    };

    const handleDocumentRemove = id => {
        formProps.valueGetter('documents').length + (values.documents.length - 1) <= 20 && setDocumentsOverflow(false);
        setValues({
            ...values,
            documents: values.documents.filter(d => d.id !== id)
        })
    };

    return (
        <div className="application-form">
            <Card>
                <div className="nursery-documents-status__head">
                    <Link to={`/kennel/${alias}/documents`} className="nursery-documents-status__head-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Заявка на получение документов РКФ</span>
                </div>
                {!loaded ?
                    <Loading centered={false} /> :
                    <Form
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        key={JSON.stringify(initialValues)}
                        render={formRenderProps => {
                            if (!formProps) setFormProps(formRenderProps);
                            return (
                                <FormElement>
                                    <div className="application-form__content">
                                        {values && values.rejected_comment &&
                                            <p className="application-form__danger">{values.rejected_comment}</p>
                                        }
                                        <h4 className="application-form__title" style={{ marginBottom: 0 }}>
                                            {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                        </h4>
                                        <div className="application-form__row-is-foreign">
                                            <div className="application-form__declarant">
                                                <p className={`k-label${disableAllFields ? ' k-text-disabled' : ''}`}>
                                                    <span>Ответственное лицо</span>
                                                    {!disableAllFields &&
                                                        <>
                                                            &nbsp;
                                                            <span>
                                                                (<a href={`/kennel/${alias}/documents/responsible/form`}>Создать ответственное лицо</a>)
                                                            </span>
                                                        </>
                                                    }
                                                </p>
                                                <Field
                                                    id="declarant_id"
                                                    name="declarant_id"
                                                    component={FormDropDownList}
                                                    data={declarants}
                                                    defaultItem={values && values.declarant_name
                                                        ? { text: values.declarant_name, value: values.declarant_id }
                                                        : { text: "Не выбран", value: 0 }
                                                    }
                                                    validator={disableAllFields ? '' : documentTypeRequired}
                                                    disabled={disableAllFields}
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
                                        <div className="application-form__row row _payment-info">
                                            <div>
                                                <Field
                                                    id="owner_last_name"
                                                    name="owner_last_name"
                                                    label="Фамилия владельца"
                                                    cutValue={150}
                                                    component={FormInput}
                                                    validator={value => nameRequiredValidator(value, 150)}
                                                    disabled={disableOwner}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    id="owner_first_name"
                                                    name="owner_first_name"
                                                    label="Имя владельца"
                                                    cutValue={150}
                                                    component={FormInput}
                                                    validator={value => nameRequiredValidator(value, 150)}
                                                    disabled={disableOwner}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    id="owner_second_name"
                                                    name="owner_second_name"
                                                    label="Отчество владельца"
                                                    cutValue={150}
                                                    component={FormInput}
                                                    validator={value => nameValidator(value, 150)}
                                                    disabled={disableOwner}
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
                                            <div>
                                                <Field
                                                    id="document_type_id"
                                                    name="document_type_id"
                                                    label="Выберите тип документа"
                                                    component={FormDropDownList}
                                                    onChange={handleDocTypeChange}
                                                    data={documentTypes.id}
                                                    defaultItem={values && values.document_type_name
                                                        ? { text: values.document_type_name, value: values.document_type_id }
                                                        : { text: "Не выбран", value: 0 }
                                                    }
                                                    validator={disableAllFields ? '' : documentTypeRequired}
                                                    disabled={disableAllFields}
                                                />
                                            </div>
                                            <div className="application-form__doc-type-id">
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <Field
                                                            id="rkf_document_type_id"
                                                            name="rkf_document_type_id"
                                                            label="Документ"
                                                            component={FormDropDownList}
                                                            data={documentTypeIds}
                                                            defaultItem={values && values.rkf_document_type_name
                                                                ? { text: values.rkf_document_type_name, value: values.rkf_document_type_id }
                                                                : { text: "Не выбран", value: 0 }
                                                            }
                                                            validator={documentTypeRequired}
                                                            disabled={disableAllFields}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="application-form__row row">
                                            <Field
                                                id="pedigree_number"
                                                name="pedigree_number"
                                                label="№ родословной собаки"
                                                hint={!isForeignPedigree ? 'Допускается ввод только цифр' : ''}
                                                maxLength={30}
                                                onlyNumbers={!isForeignPedigree}
                                                disabled={!editable || disableFields}
                                                component={FormInput}
                                                validator={requiredValidator}
                                            />
                                            {editable && !disableFields && !isForeignPedigree &&
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
                                                disabled={!editable || disableFields}
                                                component={FormInput}
                                                validator={requiredValidator}
                                            />
                                            {editable && disableFields &&
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
                                        <div className="application-form__row row">
                                            <Field
                                                id="is_foreign_pedigree"
                                                name="is_foreign_pedigree"
                                                label="Иностранная родословная"
                                                component={FormContactsCheckbox}
                                                onChange={handleChange}
                                                disabled={!editable}
                                            />
                                        </div>
                                    </div>

                                    <div className="application-form__content">
                                        <h4 className="application-form__title">Документы</h4>
                                        {!!status && values &&
                                            <DocumentLinksArray
                                                documents={values.documents}
                                                editable={editable}
                                                onRemove={handleDocumentRemove}
                                            />
                                        }
                                        {editable &&
                                            <>
                                                <div>
                                                    При загрузке файлов постарайтесь&nbsp;
                                                    <LightTooltip title="Инструкция: конвертирование и объединение файлов" enterDelay={200} leaveDelay={200}>
                                                        <>
                                                            <a href="https://help.rkf.online/ru/knowledge_base/art/72/cat/3/konvertirovanie-i-obyedinenie-fajlov-dlja-podachi-obraschenij-na-platforme-rkfonline"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="application-form__how-to-link"
                                                            >объединить их в один файл </a>
                                                            (PDF, JPEG, JPG, PNG)
                                                        </>
                                                    </LightTooltip>.
                                                </div>
                                                <div className="application-form__file">
                                                    <Field
                                                        id="documents"
                                                        name="documents"
                                                        fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                                        component={FormUpload}
                                                        saveUrl={'/api/requests/get_rkf_document/getrkfdocumentrequestdocument'}
                                                        saveField="document"
                                                        multiple={true}
                                                        showActionButtons={!documentsOverflow}
                                                        onAdd={onAdd}
                                                        onRemove={onRemove}
                                                        onBeforeUpload={e => onBeforeUpload(e, 27)}
                                                        onStatusChange={(e) => onStatusChange(e, 'documents')}
                                                        onProgress={(e) => onProgress(e, 'documents')}
                                                        validator={values?.documents.length
                                                            ? ''
                                                            : () => documentRequiredValidator(formProps?.valueGetter('documents').find(d => d.id))
                                                        }
                                                    />
                                                    {values &&
                                                        values.veterinary_contract_document_id &&
                                                        !formRenderProps.valueGetter('veterinary_contract_document').length &&
                                                        <DocumentLink docId={values.veterinary_contract_document_id} />
                                                    }
                                                    {documentsOverflow && <div id="documents_error" role="alert" className="k-form-error k-text-start">
                                                        Вы не можете добавить больше 20 документов
                                                    </div>}
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <div className="application-form__content">
                                        <h4 className="application-form__title">Информация о платеже</h4>
                                        {!disableAllFields &&
                                            <p>Приложите квитанцию об оплате заявки и заполните информацию о платеже (PDF, JPEG, JPG, PNG).</p>
                                        }
                                        <div className="application-form__row">
                                            {editable ?
                                                <div className="application-form__file">
                                                    <Field
                                                        id="payment_document"
                                                        name="payment_document"
                                                        fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                                                        component={FormUpload}
                                                        saveUrl={'/api/requests/get_rkf_document/getrkfdocumentrequestdocument'}
                                                        saveField="document"
                                                        multiple={false}
                                                        showActionButtons={true}
                                                        onBeforeUpload={e => onBeforeUpload(e, 5)}
                                                        onStatusChange={e => onStatusChange(e, 'payment_document')}
                                                        onProgress={e => onProgress(e, 'payment_document')}
                                                        validator={status === 'edit' ? '' : () => documentRequiredValidator(formProps?.valueGetter('payment_document')
                                                            .find(d => d.id))}
                                                    />
                                                    {values &&
                                                        values.payment_document_id &&
                                                        !formRenderProps.valueGetter('payment_document').length &&
                                                        <DocumentLink docId={values.payment_document_id} />
                                                    }
                                                </div>
                                                : <div className="application-form__file">
                                                    <p className="k-label">Квитанция об оплате (PDF, JPEG, JPG, PNG)</p>
                                                    <DocumentLink docId={values.payment_document_id} />
                                                </div>
                                            }
                                        </div>
                                        <div className="application-form__row">
                                            <div>
                                                <Field
                                                    id="payment_date"
                                                    name="payment_date"
                                                    label="Дата оплаты"
                                                    max={new Date()}
                                                    component={FormDatePicker}
                                                    validator={dateRequiredValidator}
                                                    disabled={!editable}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    id="payment_number"
                                                    name="payment_number"
                                                    label="Номер платежного документа"
                                                    cutValue={30}
                                                    component={FormInput}
                                                    validator={requiredWithTrimValidator}
                                                    disabled={!editable}
                                                />
                                            </div>
                                        </div>
                                        <div className="application-form__row">
                                            <Field
                                                id="payment_name"
                                                name="payment_name"
                                                label="ФИО плательщика/наименования юр. лица"
                                                cutValue={150}
                                                component={FormInput}
                                                validator={value => nameRequiredValidator(value, 150)}
                                                disabled={!editable}
                                            />
                                            <Field
                                                id="inn"
                                                name="inn"
                                                label="ИНН (для юр. лиц)"
                                                cutValue={12}
                                                onlyNumbers={true}
                                                component={FormInput}
                                                validator={innValidator}
                                                disabled={!editable}
                                            />
                                        </div>
                                        {editable &&
                                            <div className="application-form__row">
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

                                    <div className="application-form__controls">
                                        {editable &&
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!formRenderProps.modified || !formRenderProps.valid || disableSubmit}
                                            >Отправить</button>
                                        }
                                    </div>
                                </FormElement>
                            )}
                        }
                    />
                }
            </Card>
            <NotificationGroup
                style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '40px',
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