import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import Loading from "../../../../../components/Loading";
import Card from "../../../../../components/Card";
import FormInput from "../../../../../components/kendo/Form/FormInput";
import FormContactsCheckbox from "../../../../../components/kendo/Form/FormContactsCheckbox";
import FormUpload from "./components/FormUpload";
import AdditionalDocuments from "./components/AdditionalDocuments";
import FormDropDownList from "../../../../../components/kendo/Form/FormDropDownList";
import FormTextArea from "../../../../../components/kendo/Form/FormTextArea";
import DocumentLink from "../../../../../components/DocumentLink";
import {
    dateRequiredValidator,
    nameRequiredValidator,
    documentRequiredValidator,
    requiredWithTrimValidator,
    documentTypeRequired,
    innValidator,
    requiredValidator,
} from "../../../../../components/kendo/Form/validators";
import { Request, getHeaders } from "../../../../../utils/request";
import { years } from "./config";
import {DateInput} from "../../../../../components/materialUI/DateTime";
import {apiGetRkfDocuments} from "../../../config";

import "./index.scss";

const CheckMembershipForm = ({ nurseryAlias, history, status }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };

    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableIsActualFields, setDisableIsActualFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isActual, setIsActual] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [values, setValues] = useState({});
    const [formProps, setFormProps] = useState(null);
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [docTypes, setDocTypes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [confirmationHref, setConfirmationHref] = useState('');
    const [documents, setDocuments] = useState([]);
    const [initialValues, setInitialValues] = useState({
        is_actual: false,
        comment: '',
        changes_confirmation_document_id: null,
        membership_confirmation_document_id: [],
        mating_whelping_book_document_id: [],
        mating_whelping_book_document_year: 0,
        payment_document_id: [],
        payment_date: '',
        payment_number: '',
        payment_name: '',
        inn: '',
        documents: []
    });

    const editable = !status || status === 'edit';
    const isView = status === 'view' || status === 'edit';

    //get .doc checkmembership template document
    useEffect(() => {
        Promise.all([
            fetch('/api/requests/membership_confirmation_request/membershipconfirmationdocument/membership_document', { headers })
                .then(response => response.blob())
                .then(data => setConfirmationHref(URL.createObjectURL(data)))
                .then(() => setLoaded(true))
        ])
    }, []);

    useEffect(() => {
        if (status === 'edit') {
            (() => Request({
                url: `/api/requests/commonrequest/membership_confirmation_additional_doc_types`
            }, data => {
                setDocTypes(data);
                setLoaded(true);
            }, error => {
                history.replace('/404');
                console.log(error)
            }))();
            setDisableAllFields(true);
        }
    }, [status]);

    useEffect(() => {
        if (status) {
            const paramsArr = history.location.pathname.split('/');
            const id = paramsArr[paramsArr.length - 1];

            (() => Request({
                url: `/api/requests/membership_confirmation_request/kennelmembershipconfirmationrequest?id=${id}`
            }, data => {
                let values = {};
                Object.keys(initialValues).forEach(key => {
                    values[key] = data[key] || initialValues[key];
                });
                if (data.documents) {
                    setDocuments(data.documents);
                }
                if (data.is_actual) {
                    setIsActual(true);
                }
                setValues(data);
                setInitialValues(values);
                setLoaded(true);
            }, error => {
                history.replace('/404');
                console.log(error)
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

    const handleSubmit = async data => {
        const changesConfirmationDocumentId = formProps.valueGetter('changes_confirmation_document_id') === null ? null : formProps.valueGetter('changes_confirmation_document_id')[0]?.id;
        const membershipConfirmationDocumentId = formProps.valueGetter('membership_confirmation_document_id')[0]?.id;
        const matingWhelpingBookDocumentId = formProps.valueGetter('mating_whelping_book_document_id')[0]?.id;
        const paymentId = formProps.valueGetter('payment_document_id')[0]?.id;

        setDisableSubmit(true);

        let newData = {
            ...data,
            payment_document_id: paymentId ? paymentId : data.payment_document_id,
            changes_confirmation_document_id: changesConfirmationDocumentId ? changesConfirmationDocumentId : data.changes_confirmation_document_id,
            membership_confirmation_document_id: membershipConfirmationDocumentId ? membershipConfirmationDocumentId : data.membership_confirmation_document_id,
            mating_whelping_book_document_id: matingWhelpingBookDocumentId ? matingWhelpingBookDocumentId : data.mating_whelping_book_document_id,
        };

        newData.payment_date = moment(newData.payment_date).format("YYYY-MM-DD");

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
            url: '/api/requests/membership_confirmation_request/kennelmembershipconfirmationrequest',
            method: status === 'edit' ? 'PUT' : 'POST',
            data: JSON.stringify(newData)
        }, () => {
            history.push(`/kennel/${nurseryAlias}/documents/responsible`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };

    const handleIsActualChange = (name) => {
        if (name === 'is_actual') {
            const isActual = !formProps.valueGetter(name);

            formProps.onChange('comment', { value: '' });

            formProps.onChange('changes_confirmation_document_id', { value: null });

            setDisableIsActualFields(!disableIsActualFields);
            setIsActual(isActual);
        }
        formProps.onChange(name, { value: !formProps.valueGetter(name) })
    };

    const onAdd = (e, doc_type) => {
        const { newState } = e;
        if (status === 'edit') {
            (values.documents?.length + newState.length) > 10
                ? setDocumentsOverflow(true)
                : formProps.onChange(`${doc_type}`, { value: newState })
        } else {
            newState.length > 10
                ? setDocumentsOverflow(true)
                : formProps.onChange(`${doc_type}`, { value: newState })
        }
    };

    const onRemove = (e, doc_type) => {
        const { newState } = e;
        newState.length <= 10 && setDocumentsOverflow(false);
        formProps.onChange(`${doc_type}`, { value: newState })
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

    const handleYearChange = year => {
        const { value } = year;
        formProps.onChange('mating_whelping_book_document_year', { value: value });
    };

    return (
        <div className="application-form">
            <Card>
                <div className="club-documents-status__head">
                    <Link to={`/kennel/${nurseryAlias}/documents/responsible`} className="club-documents-status__head-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Отчёты о племенной деятельности</span>
                </div>
                {
                    !loaded ?
                        <Loading centered={false} /> :
                        <>
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
                                                <div className="application-form__row-is-actual">
                                                    <div>
                                                        <Field
                                                            id="is_actual"
                                                            name="is_actual"
                                                            label="Подтверждаю актуальность данных на платформе"
                                                            component={FormContactsCheckbox}
                                                            value={isActual}
                                                            onChange={handleIsActualChange}
                                                            disabled={disableAllFields}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="application-form__row row">
                                                    <div className="application-form__row">
                                                        <Field
                                                            id="comment"
                                                            name="comment"
                                                            label="Комментарий"
                                                            maxLength={500}
                                                            component={FormTextArea}
                                                            placeholder={!isActual ? `Прошу изменить/добавить данные` : ``}
                                                            disabled={disableAllFields || disableIsActualFields}
                                                            validator={disableAllFields || disableIsActualFields ? '' : value => requiredValidator(value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        Документ для подтверждения вносимых изменений
                                                    </div>
                                                    <div className="application-form__file">
                                                        {!isView ? <Field
                                                            id="changes_confirmation_document_id"
                                                            name="changes_confirmation_document_id"
                                                            fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                            component={FormUpload}
                                                            saveUrl={'/api/requests/membership_confirmation_request/membershipconfirmationdocument'}
                                                            saveField="document"
                                                            multiple={false}
                                                            showActionButtons={!documentsOverflow}
                                                            onAdd={e => onAdd(e, 'changes_confirmation_document_id')}
                                                            onRemove={e => onRemove(e, 'changes_confirmation_document_id')}
                                                            onBeforeUpload={e => onBeforeUpload(e, 49)}
                                                            onStatusChange={(e) => onStatusChange(e, 'changes_confirmation_document_id')}
                                                            onProgress={(e) => onProgress(e, 'changes_confirmation_document_id')}
                                                            disabled={disableAllFields || disableIsActualFields}
                                                            validator={values?.documents?.length || disableAllFields || disableIsActualFields
                                                                ? ''
                                                                : () => documentRequiredValidator(formProps?.valueGetter('changes_confirmation_document_id')?.find(d => d.id))
                                                            }
                                                        /> : <>
                                                                {values &&
                                                                    values.changes_confirmation_document_id &&
                                                                    !formRenderProps.valueGetter('changes_confirmation_document_id')?.length &&
                                                                    <DocumentLink
                                                                        docId={values.changes_confirmation_document_id}
                                                                        endpoint={apiGetRkfDocuments}
                                                                    />
                                                                }</>}
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '30px' }}>
                                                    <div style={{ display: 'inline-block' }}>
                                                        Заявление о подтверждении членства
                                            </div>&nbsp;&nbsp;&nbsp;<a href={confirmationHref} style={{ textDecoration: 'none' }}>Скачать бланк</a>
                                                    <div className="application-form__file">
                                                        {!isView ? <Field
                                                            id="membership_confirmation_document_id"
                                                            name="membership_confirmation_document_id"
                                                            fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                            component={FormUpload}
                                                            showActionButtons={!documentsOverflow}
                                                            saveUrl={'/api/requests/membership_confirmation_request/membershipconfirmationdocument'}
                                                            saveField="document"
                                                            multiple={false}
                                                            onAdd={e => onAdd(e, 'membership_confirmation_document_id')}
                                                            onRemove={e => onRemove(e, 'membership_confirmation_document_id')}
                                                            onBeforeUpload={e => onBeforeUpload(e, 50)}
                                                            onStatusChange={(e) => onStatusChange(e, 'membership_confirmation_document_id')}
                                                            onProgress={(e) => onProgress(e, 'membership_confirmation_document_id')}
                                                            disabled={disableAllFields}
                                                            validator={values?.documents?.length || disableAllFields
                                                                ? ''
                                                                : () => documentRequiredValidator(formProps?.valueGetter('membership_confirmation_document_id').find(d => d.id))
                                                            }
                                                        /> : <>
                                                                {values &&
                                                                    values.membership_confirmation_document_id &&
                                                                    !formRenderProps.valueGetter('membership_confirmation_document_id').length &&
                                                                    <DocumentLink
                                                                        docId={values.membership_confirmation_document_id}
                                                                        endpoint={apiGetRkfDocuments}
                                                                    />
                                                                }</>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="application-form__row" style={{ flexWrap: 'wrap' }}>
                                                        <div style={{ marginTop: '30px' }}>
                                                            <div>
                                                                Книга вязок и щенений&nbsp;&nbsp;&nbsp;
                                                        <a href="https://help.rkf.online/ru/knowledge_base/art/72/cat/3/konvertirovanie-i-obyedinenie-fajlov-dlja-podachi-obraschenij-na-platforme-rkfonline"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="application-form__how-to-link"
                                                                >Инструкция по объединению файлов / изображений</a>
                                                            </div>
                                                            <div style={{ color: '#90999e' }}>Книга вязок должна быть прикреплена единым многостраничным файлом.</div>
                                                            <div className="application-form__file">
                                                                {!isView ? <Field
                                                                    id="mating_whelping_book_document_id"
                                                                    name="mating_whelping_book_document_id"
                                                                    fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                                    component={FormUpload}
                                                                    showActionButtons={!documentsOverflow}
                                                                    saveUrl={'/api/requests/membership_confirmation_request/membershipconfirmationdocument'}
                                                                    saveField="document"
                                                                    multiple={false}
                                                                    onAdd={e => onAdd(e, 'mating_whelping_book_document_id')}
                                                                    onRemove={e => onRemove(e, 'mating_whelping_book_document_id')}
                                                                    onBeforeUpload={e => onBeforeUpload(e, 51)}
                                                                    onStatusChange={(e) => onStatusChange(e, 'mating_whelping_book_document_id')}
                                                                    onProgress={(e) => onProgress(e, 'mating_whelping_book_document_id')}
                                                                    disabled={disableAllFields}
                                                                    validator={values?.documents?.length || disableAllFields
                                                                        ? ''
                                                                        : () => documentRequiredValidator(formProps?.valueGetter('mating_whelping_book_document_id').find(d => d.id))
                                                                    }
                                                                /> : <>
                                                                        {values &&
                                                                            values.mating_whelping_book_document_id &&
                                                                            !formRenderProps.valueGetter('mating_whelping_book_document_id').length &&
                                                                            <DocumentLink
                                                                                docId={values.mating_whelping_book_document_id}
                                                                                endpoint={apiGetRkfDocuments}
                                                                            />
                                                                        }</>}
                                                            </div>
                                                        </div>
                                                        <div className={`application-form__year ${status ? `_status` : ``}`}>
                                                            <Field
                                                                id="mating_whelping_book_document_year"
                                                                name="mating_whelping_book_document_year"
                                                                component={FormDropDownList}
                                                                onChange={handleYearChange}
                                                                data={years}
                                                                defaultItem={values && values.mating_whelping_book_document_year
                                                                    ? { text: values.mating_whelping_book_document_year, value: values.mating_whelping_book_document_year }
                                                                    : { text: "Выберите год", value: 0 }
                                                                }
                                                                validator={disableAllFields ? '' : documentTypeRequired}
                                                                disabled={disableAllFields}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="application-form__content">
                                                <h4 className="application-form__title">Информация о платеже</h4>
                                                {!disableAllFields && <>
                                                    <p>Приложите квитанцию об оплате заявки и заполните информацию о платеже<br />(PDF, JPEG, JPG).</p>
                                                </>}
                                                <div className="application-form__row">
                                                    <div className="application-form__file">
                                                        {!isView ? <Field
                                                            id="payment_document_id"
                                                            name="payment_document_id"
                                                            fileFormats={['.pdf', '.jpg', '.jpeg']}
                                                            component={FormUpload}
                                                            saveUrl="/api/requests/membership_confirmation_request/membershipconfirmationdocument"
                                                            saveField="document"
                                                            multiple={false}
                                                            showActionButtons={!documentsOverflow}
                                                            onAdd={e => onAdd(e, 'payment_document_id')}
                                                            onRemove={e => onRemove(e, 'payment_document_id')}
                                                            onBeforeUpload={e => onBeforeUpload(e, 5)}
                                                            onStatusChange={e => onStatusChange(e, 'payment_document_id')}
                                                            onProgress={e => onProgress(e, 'payment_document_id')}
                                                            disabled={disableAllFields}
                                                            validator={status === 'edit' ? '' : () => documentRequiredValidator(formProps?.valueGetter('payment_document_id').find(d => d.id))}
                                                        /> : <>
                                                                {values &&
                                                                    values.payment_document_id &&
                                                                    !formRenderProps.valueGetter('payment_document_id').length &&
                                                                    <DocumentLink
                                                                        docId={values.payment_document_id}
                                                                        endpoint={apiGetRkfDocuments}
                                                                    />
                                                                }</>}
                                                    </div>
                                                </div>
                                                <div className="application-form__row">
                                                    <div>
                                                        <Field
                                                            id="payment_date"
                                                            name="payment_date"
                                                            label="Дата оплаты"
                                                            maxDate={moment().format('YYYY-MM-DD')}
                                                            component={DateInput}
                                                            validator={dateRequiredValidator}
                                                            disabled={disableAllFields}
                                                            editable={!editable}
                                                            value={formProps?.valueGetter('payment_date')}
                                                            onChange={date => formProps.onChange('payment_date', {
                                                                value: date,
                                                            })}
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
                                                            disabled={disableAllFields}

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
                                                        disabled={disableAllFields}
                                                    />
                                                    <Field
                                                        id="inn"
                                                        name="inn"
                                                        label="ИНН (для юр. лиц)"
                                                        cutValue={12}
                                                        onlyNumbers={true}
                                                        component={FormInput}
                                                        validator={innValidator}
                                                        disabled={disableAllFields}
                                                    />
                                                </div>
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
                            {status === 'edit' && <AdditionalDocuments
                                id={values.id}
                                attachedDocuments={values.documents}
                                history={history}
                                alias={nurseryAlias}
                                docTypes={docTypes}
                                handleError={handleError}
                            />}
                            {status === 'view' && !!documents.length &&
                                <div><h3 className="application-form__additional-title">Дополнительные документы</h3>
                                    {
                                        (documents && documents.length > 0) &&
                                            documents.map(item =>
                                                <DocumentLink
                                                    docId={item.id}
                                                    endpoint={apiGetRkfDocuments}
                                                />)
                                    }
                                </div>
                            }
                        </>
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
        </div >
    )
};

export default React.memo(CheckMembershipForm);