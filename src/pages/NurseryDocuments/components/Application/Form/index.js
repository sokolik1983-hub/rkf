import React, {useEffect, useState} from "react";
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
import FormDropDownList from "../../../../../components/kendo/Form/FormDropDownList";
import FormTextArea from "../../../../../components/kendo/Form/FormTextArea";
import FormComboBox from './components/FormComboBox';
import DocumentLink from "../../../../../components/DocumentLink";
import {
    nameRequiredValidator,
    documentRequiredValidator,
    requiredWithTrimValidator,
    documentTypeRequired,
    innValidator,
    requiredValidator,
    nameValidator,
} from "../../../../../components/kendo/Form/validators";
import { PromiseRequest, Request } from "../../../../../utils/request";
import { getHeaders } from "../../../../../utils/request";
import ruMessages from "../../../../../kendoMessages.json"
import DocLink from '../../../../Docs/components/DocApply/components/DocLink';
import {DateInput} from "../../../../../components/materialUI/DateTime";
import FooterFeedback from "../../../../../components/Layouts/FooterFeedback";
import {apiGetRkfDocuments} from "../../../config";

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
    const [breeds, setBreeds] = useState([]);
    const [documentTypes, setDocumentTypes] = useState({ id: [], documents: [] });
    const [documentTypeIds, setDocumentTypeIds] = useState([]);
    const [formProps, setFormProps] = useState(null);
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [withoutBreed, setWithoutBreed] = useState(false);
    const [isCertificate, setIsCertificate] = useState(false);
    const [requestId, setRequestId] = useState(0);
    const [docId, setDocId] = useState(0);
    const [payId, setPayId] = useState(0);

    const [initialValues, setInitialValues] = useState({
        declarant_id: 0,
        is_foreign_owner: false,
        owner_last_name: '',
        owner_first_name: '',
        owner_second_name: '',
        express: false,
        pedigree_number: '',
        dog_name: '',
        breed_id: '',
        breed_name: '',
        is_foreign_pedigree: false,
        is_return: false,
        payment_date: '',
        payment_number: '',
        payment_document_id: '',
        payment_name: '',
        application_document_id: '',
        application_document_accept: '',
        inn: '',
        comment: '',
        document_type_id: 0,
        rkf_document_type_id: 0,
        payment_document: [],
        application_document: [],
        documents: [],
        breeds: [],
        without_breed: false,
    });
    const editable = !status || status === 'edit';

    useEffect(() => {
        if (!status) {
            Promise.all([
                PromiseRequest({ url: '/api/nurseries/Nursery/pedigree_request_information' }),
                PromiseRequest({ url: '/api/nurseries/nurserydeclarant/nursery_declarants' }),
                PromiseRequest({ url: '/api/requests/commonrequest/rkf_document_types' }),
                PromiseRequest({ url: '/api/dog/Breed' })
            ]).then(data => {
                const owner = data[0];
                const declarants = data[1];
                const documents = data[2];
                const breeds = data[3];

                let newInitialValues = { ...initialValues };

                if (owner) {
                    setOwner(owner);

                    newInitialValues.owner_last_name = owner.owner_last_name;
                    newInitialValues.owner_first_name = owner.owner_first_name;
                    newInitialValues.owner_second_name = owner.owner_second_name || '';
                } else {
                    setError('Ошибка получения владельца');
                }

                if (declarants) {
                    setDeclarants(declarants.map(declarant => ({ text: declarant.full_name, value: declarant.id })));

                    newInitialValues.declarant_id = declarants.find(declarant => declarant.is_default) ? declarants.find(declarant => declarant.is_default).id : 0;
                } else {
                    setError('Ошибка получения ответственных лиц');
                }

                if (documents) {
                    setDocumentTypes({
                        ...documentTypes,
                        id: documents.id.map(d => ({ text: d.name, value: d.id })),
                        documents: documents.documents.map(d => ({ text: d.name, value: d.id, document_type_id: d.document_type_id })),
                        kerung_breeds: documents.documents_breeds
                    });
                } else {
                    setError('Ошибка получения документов');
                }

                if (breeds) {
                    setBreeds(breeds);
                    newInitialValues.breeds = breeds;
                } else {
                    setError('Ошибка получения пород');
                }

                setInitialValues(newInitialValues);

                setLoaded(true);
            }).catch(error => handleError(error));
        }
    }, []);

    useEffect(() => {
        if (status) {
            const paramsArr = history.location.pathname.split('/');
            const id = paramsArr[paramsArr.length - 1];

            Promise.all([
                PromiseRequest({ url: `/api/requests/get_rkf_document_request/kennelgetrkfdocumentrequest?id=${id}` }),
                PromiseRequest({ url: `/api/dog/Breed` }),
                PromiseRequest({ url: `/api/requests/commonrequest/rkf_document_types` })
            ]).then(data => {
                const requestData = data[0];
                const breedsData = data[1];
                const rkfDocTypesData = data[2];

                let breeds;
                if (requestData.rkf_document_type_id === 61) {
                    breeds = rkfDocTypesData.documents_breeds['61']
                } else if (requestData.rkf_document_type_id === 62) {
                    breeds = rkfDocTypesData.documents_breeds['62']
                } else {
                    breeds = breedsData;
                }

                let values = {};
                Object.keys(initialValues).forEach(key => {
                    values[key] = requestData[key] || initialValues[key];
                });
                if (requestData.documents) {
                    values.documents = [];
                }
                if (requestData.is_foreign_pedigree) {
                    setIsForeignPedigree(true);
                }
                if (!requestData.owner_last_name) {
                    (async () => await Request({
                        url: `/api/nurseries/Nursery/pedigree_request_information`
                    }, dataInfo => {
                        if (dataInfo) {
                            requestData.owner_last_name = dataInfo.owner_last_name;
                            requestData.owner_first_name = dataInfo.owner_first_name;
                            requestData.owner_second_name = dataInfo.owner_second_name;

                            let values = {};
                            Object.keys(initialValues).forEach(key => {
                                values[key] = requestData[key] || initialValues[key];
                            });
                            if (requestData.documents) {
                                values.documents = [];
                            }
                            setValues(requestData);
                            setInitialValues({
                                ...values,
                                breeds: breeds
                            });
                        }
                    }, error => {
                        handleError(error);
                    }))();
                }

                setValues(requestData);
                setInitialValues({
                    ...values,
                    breeds: breeds
                });
            }).then(() => setLoaded(true));

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

    const handleSubmit = async data => {
        const paymentId = formProps.valueGetter('payment_document')[0]?.id;
        const applicationDocumentId = formProps.valueGetter('application_document')[0]?.id;
        setDisableSubmit(true);
        let newData = {
            ...data,
            payment_document_id: paymentId ? paymentId : data.payment_document_id,
            application_document_id: applicationDocumentId ? applicationDocumentId : data.application_document_id
        };

        delete newData.declarant_name;
        delete newData.document_type_id;
        delete newData.payment_document;
        delete newData.application_document;
        delete newData.breeds;
        delete newData.breed_name;

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

    const handleChange = name => {
        if (name === 'is_foreign_owner') {
            const isForeign = !formProps.valueGetter(name);

            formProps.onChange('owner_last_name', {
                value:
                    !isForeign && owner ? owner.owner_last_name :
                        values && values.owner_last_name ? values.owner_last_name :
                            ''
            });
            formProps.onChange('owner_first_name', {
                value:
                    !isForeign && owner ? owner.owner_first_name :
                        values && values.owner_first_name ? values.owner_first_name :
                            ''
            });
            formProps.onChange('owner_second_name', {
                value:
                    !isForeign && owner && owner.owner_second_name ? owner.owner_second_name :
                        values && values.owner_second_name ? values.owner_second_name :
                            ''
            });

            setDisableOwner(!isForeign);
        }

        if (name === 'is_return' && status === 'edit' && (formProps.valueGetter(name) === false)) {
            return;
        }

        if (name === 'is_foreign_pedigree') {
            const isForeign = !formProps.valueGetter(name);

            formProps.onChange('pedigree_number', { value: '' });

            formProps.onChange('dog_name', { value: '' });

            setDisableFields(false);
            setIsForeignPedigree(isForeign);
        }

        if (name === 'without_breed') {
            const without_breed = !formProps.valueGetter(name);
            if (without_breed) {
                formProps.onChange('breed_id', { value: '' });
            }
            setWithoutBreed(without_breed);
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

            name === 'application_document' ? setRequestId(response?.response?.result?.id,)
                : name === 'documents' ? setDocId(response?.response?.result?.id,)
                    : setPayId(response?.response?.result?.id,);
        } else {
            formProps.onChange(name, { value: newState });
        }
    };

    const handleDocTypeChange = docType => {
        const { value } = docType;
        if (value === 44) {
            setIsCertificate(true)
        } else {
            setIsCertificate(false)
        }
        setDocumentTypeIds(documentTypes.documents.filter(d => d.document_type_id === value));
        formProps.onChange('document_type_id', { value: docType });
        formProps.onChange('rkf_document_type_id', { value: 0 });
    };

    const handleRKFDocTypeChange = docType => {
        const { value } = docType;
        formProps.onChange('rkf_document_type_id', docType);

        if (value === 61) {
            formProps.onChange('breeds', { value: documentTypes.kerung_breeds['61'] });
            formProps.onChange('breed_id', { value: '' });
        } else if (value === 62) {
            formProps.onChange('breeds', { value: documentTypes.kerung_breeds['62'] });
            formProps.onChange('breed_id', { value: '' });
        } else {
            formProps.onChange('breeds', { value: breeds });
        }
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
                                        <h4 className="application-form__title" style={{ marginBottom: 0, marginTop: '20px' }}>
                                            {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                        </h4>
                                        <div className="application-form__row row">
                                            <Field
                                                id="is_return"
                                                name="is_return"
                                                label="Из возврата/исправление ошибки"
                                                component={FormContactsCheckbox}
                                                onChange={handleChange}
                                                disabled={!editable || (status === 'edit' && formRenderProps.valueGetter('is_return') === false)}
                                            />
                                        </div>
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
                                                            onChange={handleRKFDocTypeChange}
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
                                                    style={{ marginTop: '45px' }}
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
                                                        formRenderProps.onChange('pedigree_number', { value: '' });
                                                        formRenderProps.onChange('dog_name', { value: '' });
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
                                        <div className="application-form__row row">
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id="breed_id"
                                                            name="breed_id"
                                                            label="Порода"
                                                            component={FormComboBox}
                                                            textField="name"
                                                            data={formRenderProps.valueGetter('breeds')}
                                                            placeholder={formRenderProps.valueGetter('breed_id')
                                                                ? formRenderProps.valueGetter('breed_name') : "Не выбран"}
                                                            onChange={formRenderProps.onChange}
                                                            clearButton={editable}
                                                            validationMessage="Обязательное поле"
                                                            valid={disableAllFields || withoutBreed || (formRenderProps.modified ? formRenderProps.valueGetter('breed_id') && (!status || (status === 'edit' && initialValues.breed_id)) : true)}
                                                            disabled={!editable || withoutBreed || formRenderProps.valueGetter('without_breed')}
                                                            resetValue={withoutBreed}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                            {(isCertificate || values?.document_type_id === 44) && <div className="application-form__without-breed">
                                                <Field
                                                    id="without_breed"
                                                    name="without_breed"
                                                    label="без породы"
                                                    component={FormContactsCheckbox}
                                                    onChange={handleChange}
                                                    disabled={status}
                                                />
                                            </div>}
                                            {!isCertificate && <div></div>}
                                        </div>
                                    </div>
                                    {(editable || values?.application_document_id) && <div className="application-form__content">
                                        <h4 className="application-form__title no-margin">Заявочный лист</h4>
                                        <div className="application-form__row">
                                            {editable
                                                ? <div className="application-form__file">
                                                    <Field
                                                        id="application_document"
                                                        name="application_document"
                                                        fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                        component={FormUpload}
                                                        saveUrl={'/api/requests/get_rkf_document/getrkfdocumentrequestdocument'}
                                                        saveField="document"
                                                        multiple={false}
                                                        showActionButtons={true}
                                                        disabled={values?.application_document_accept}
                                                        onBeforeUpload={e => onBeforeUpload(e, 47)}
                                                        onStatusChange={e => onStatusChange(e, 'application_document')}
                                                        onProgress={e => onProgress(e, 'application_document')}
                                                        validator={status === 'edit' ? '' : () => documentRequiredValidator(formProps?.valueGetter('application_document').find(d => d.id))}
                                                    />
                                                    {values &&
                                                        values.application_document_id &&
                                                        !formRenderProps.valueGetter('application_document_id').length &&
                                                        <DocumentLink
                                                            docId={values.application_document_id}
                                                            endpoint={apiGetRkfDocuments}
                                                        />
                                                    }
                                                    <DocLink
                                                        distinction='get_rkf_document'
                                                        docId={requestId}
                                                        showLabel={false}
                                                    />
                                                </div>
                                                : values?.application_document_id && <div className="application-form__file">
                                                    <p className="k-label">Заявочный лист</p>
                                                    <DocumentLink
                                                        docId={values.application_document_id}
                                                        endpoint={apiGetRkfDocuments}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>}
                                    <div className="application-form__content">
                                        <h4 className="application-form__title">Документы</h4>
                                        {!!status && values && (values.documents.length > 0) &&
                                            values.documents.map(item =>
                                            <DocumentLink
                                                docId={item.id}
                                                endpoint={apiGetRkfDocuments}
                                            />)
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
                                                            (PDF, JPEG, JPG)
                                                        </>
                                                    </LightTooltip>.
                                                </div>
                                                <div className="application-form__file">
                                                    <Field
                                                        id="documents"
                                                        name="documents"
                                                        fileFormats={['.pdf', '.jpg', '.jpeg']}
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
                                                        <DocumentLink
                                                            docId={values.veterinary_contract_document_id}
                                                            endpoint={apiGetRkfDocuments}
                                                        />
                                                    }
                                                    {documentsOverflow && <div id="documents_error" role="alert" className="k-form-error k-text-start">
                                                        Вы не можете добавить больше 20 документов
                                                    </div>}
                                                    <DocLink
                                                        distinction="get_rkf_document"
                                                        docId={docId}
                                                        showLabel={false}
                                                    />
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <div className="application-form__content">
                                        <h4 className="application-form__title">Информация о платеже</h4>
                                        {!disableAllFields && <>
                                            <p style={{ marginBottom: '10px' }}>Приложите квитанцию об оплате заявки и заполните информацию о платеже (PDF, JPEG, JPG).</p>
                                            <p>Обращаем Ваше внимание, что платежи могут обрабатываться банком 2-3 дня. При формировании срочной заявки старайтесь произвести платёж заблаговременно.</p>
                                        </>
                                        }
                                        <div className="application-form__row">
                                            {editable ?
                                                <div className="application-form__file">
                                                    <Field
                                                        id="payment_document"
                                                        name="payment_document"
                                                        fileFormats={['.pdf', '.jpg', '.jpeg']}
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
                                                        <DocumentLink
                                                            docId={values.payment_document_id}
                                                            endpoint={apiGetRkfDocuments}
                                                        />
                                                    }
                                                    <DocLink
                                                        distinction="get_rkf_document"
                                                        docId={payId}
                                                        showLabel={false}
                                                    />
                                                </div>
                                                : <div className="application-form__file">
                                                    <p className="k-label">Квитанция об оплате (PDF, JPEG, JPG)</p>
                                                    <DocumentLink
                                                        docId={values.payment_document_id}
                                                        endpoint={apiGetRkfDocuments}
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <div className="application-form__row">
                                            <div>
                                                <Field
                                                    id="payment_date"
                                                    name="payment_date"
                                                    label="Дата оплаты"
                                                    maxDate={moment().format('YYYY-MM-DD')}
                                                    component={DateInput}
                                                    value={formProps?.valueGetter('payment_date')}
                                                    onChange={date => formProps.onChange('payment_date', {
                                                        value: date,
                                                    })}
                                                    editable={!editable}
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
                            )
                        }
                        }
                    />
                }
            </Card>
            <NotificationGroup
                style={{
                    position: 'fixed',
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

export default React.memo(Application);