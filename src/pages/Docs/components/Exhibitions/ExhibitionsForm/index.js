import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Form, Field, FieldArray, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import Loading from "../../../../../components/Loading";
import Card from "../../../../../components/Card";
import AdditionalDocuments from "./components/AdditionalDocuments";
import FormContactsFieldArray from "./components/FormContactsFieldArray";
import FormComboBox from 'pages/UserEditKendo/components/FormComboBox';
import FormDatePicker from "../../../../../components/kendo/Form/FormDatePicker";
import FormDropDownList from "../../../../../components/kendo/Form/FormDropDownList";
import FormTextArea from "../../../../../components/kendo/Form/FormTextArea";
import { requiredValidator } from "../../../../../components/kendo/Form/validators";
import { Request } from "../../../../../utils/request";
import ruMessages from "../../../../../kendoMessages.json"
import "./index.scss";
import {
    phoneRequiredValidator,
    phoneValidator,
    emailRequiredValidator,
    emailValidator
} from 'pages/UserEditKendo/validators';

loadMessages(ruMessages, 'ru');


const ExhibitionsForm = ({ clubAlias, history, status }) => {
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [values, setValues] = useState({});
    const [documents, setDocuments] = useState([]);
    const [formProps, setFormProps] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [exhibitionProperties, setExhibitionProperties] = useState({
        formats: [],
        ranks: [],
        national_breed_clubs: [],
        forbidden_dates: [],
        cities: []
    });
    const [initialValues, setInitialValues] = useState({
        format_id: '',
        rank_id: '',
        city_id: '',
        date_begin: '',
        date_end: '',
        national_breed_club_id: '',
        comment: '',
        documents: [{
            name: '',
            document_id: ''
        }],
        phones: [{
            value: '',
            is_main: true,
            description: ''
        }],
        emails: [{
            value: '',
            is_main: true,
            description: ''
        }]
    });
    const editable = !status || status === 'edit';

    useEffect(() => {
        if (!status) {
            Promise.all([getExhibitionProperties()]).then(() => setLoaded(true));
        }
    }, []);

    useEffect(() => {
        if (status) {
            const paramsArr = history.location.pathname.split('/');
            const id = paramsArr[paramsArr.length - 1];

            (() => Request({
                url: `/api/requests/get_rkf_document_request/clubgetrkfdocumentrequest?id=${id}`
            }, data => {
                let values = {};
                Object.keys(initialValues).forEach(key => {
                    values[key] = data[key] || initialValues[key];
                });
                if (data.documents) {
                    values.documents = [];
                }
                setValues(data);
                setInitialValues(values);
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

    const getExhibitionProperties = async () => {
        await Request({
            url: `/api/requests/exhibition_request/clubexhibitionrequest/exhibition_properties`
        }, data => {
            if (data) {
                setExhibitionProperties({
                    ...exhibitionProperties,
                    formats: data.formats.map(d => ({ text: d.name, value: d.id })),
                    ranks: data.ranks.map(d => ({ text: d.name, value: d.id })),
                    national_breed_clubs: data.national_breed_clubs,
                    forbidden_dates: data.forbidden_dates,
                    cities: data.cities
                });
            } else {
                setError('Ошибка');
            }
        }, error => {
            handleError(error);
        });
    };

    const handleSubmit = async data => {
        let newData = {
            ...data,
            format_id: data.format_id.value,
            date_begin: moment(data.date_begin).format(),
            date_end: moment(data.date_end).format(),
            documents: documents.map(d => ({ name: d.name, document_id: d.id }))
        };

        if (status === 'edit') {
            newData.id = values.id;
            if (values.documents) {
                newData.documents = [
                    ...values.documents,
                    ...formProps.valueGetter('documents')
                ];
            }
        };

        await Request({
            url: '/api/requests/exhibition_request/clubexhibitionrequest',
            method: status === 'edit' ? 'PUT' : 'POST',
            data: JSON.stringify(newData)
        }, () => {
            history.push(`/${clubAlias}/documents/exhibitions`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };

    const handleFormatChange = id => {
        //setDocumentTypeIds(documentTypes.documents.filter(d => d.document_type_id === value));
        formProps.onChange('format_id', { value: id });
        formProps.onChange('rank_id', { text: "Выберите формат", value: 0 });
    };

    const dateRequiredValidator = value => {
        const stopDates = exhibitionProperties.forbidden_dates;
        if (value) {
            const startDate = moment(new Date(formProps.valueGetter('date_begin')).toLocaleDateString());
            const endDate = moment(new Date(formProps.valueGetter('date_end')).toLocaleDateString());
            const selectedDate = new Date(`${value}`);
            const forbiddenDate = stopDates.find(f => new Date(`${f}`).getTime() === selectedDate.getTime());
            if (forbiddenDate) {
                return 'Проведение выставки невозможно в выбранную дату'
            } else {
                if (!!startDate && !!endDate && stopDates) {
                    if (stopDates.find(d => moment(new Date(d).toLocaleDateString()).isBetween(startDate, endDate))) {
                        return 'Проведение выставки невозможно в выбранную дату'
                    } else {
                        return ''
                    }
                }
                return ''
            }
        } else {
            return 'Обязательное поле'
        }
    }

    return (
        <div className="application-form">
            <Card>
                <div className="club-documents-status__head">
                    <Link to={`/${clubAlias}/documents`} className="club-documents-status__head-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Подача заявки на проведение выставки</span>
                </div>
                {!loaded ?
                    <Loading centered={false} /> :
                    <Form
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        key={JSON.stringify(initialValues)}
                        render={formRenderProps => {
                            if (!formProps) setFormProps(formRenderProps);
                            const isCACIB = formRenderProps.valueGetter('format_id').value === 2;
                            const isCAC = formRenderProps.valueGetter('format_id').value === 1;
                            return (
                                <FormElement>
                                    <div className="application-form__content">
                                        {values && values.rejected_comment &&
                                            <p className="application-form__danger">{values.rejected_comment}</p>
                                        }
                                        <h4 className="application-form__title" style={{ marginBottom: 0, marginTop: '20px' }}>
                                            {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                        </h4>
                                        <div className="application-form__row three-column">
                                            <div>
                                                <Field
                                                    id="format_id"
                                                    name="format_id"
                                                    label="Формат мероприятия"
                                                    component={FormDropDownList}
                                                    onChange={handleFormatChange}
                                                    data={exhibitionProperties.formats}
                                                    defaultItem={values && values.document_type_name
                                                        ? { text: values.document_type_name, value: values.document_type_id }
                                                        : { text: "Выберите формат", value: 0 }
                                                    }
                                                    validator={requiredValidator}
                                                    disabled={disableAllFields}
                                                />
                                            </div>
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <Field
                                                            id="rank_id"
                                                            name="rank_id"
                                                            label="Ранг выставки"
                                                            component={FormDropDownList}
                                                            data={exhibitionProperties.ranks}
                                                            defaultItem={values && values.rkf_document_type_name
                                                                ? { text: values.rkf_document_type_name, value: values.rkf_document_type_id }
                                                                : { text: "Выберите ранг", value: 0 }
                                                            }
                                                            validator={isCAC ? requiredValidator : null}
                                                            disabled={!isCAC || disableAllFields}
                                                            resetValue={isCAC ? false : { text: "Выберите ранг", value: 0 }}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id={'city_id'}
                                                            name={'city_id'}
                                                            label={'Город проведения выставки'}
                                                            component={FormComboBox}
                                                            textField={'name'}
                                                            data={exhibitionProperties.cities}
                                                            value={formRenderProps.valueGetter('city_id')}
                                                            onChange={formRenderProps.onChange}
                                                            validationMessage="Обязательное поле"
                                                            required={formRenderProps.valueGetter('format_id').value ? true : false}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="application-form__row two-column">
                                            <div>
                                                <Field
                                                    id="date_begin"
                                                    name="date_begin"
                                                    label="Дата начала проведения"
                                                    min={isCACIB
                                                        ? new Date(`01.01.${new Date().getFullYear() + 2}`)
                                                        : new Date(`01.01.${new Date().getFullYear() + 1}`)
                                                    }
                                                    component={FormDatePicker}
                                                    validator={dateRequiredValidator}
                                                    disabled={!formRenderProps.valueGetter('format_id').value || disableAllFields}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    id="date_end"
                                                    name="date_end"
                                                    label="Дата окончания"
                                                    min={formRenderProps.valueGetter('date_begin') ? formRenderProps.valueGetter('date_begin') : null}
                                                    component={FormDatePicker}
                                                    validator={dateRequiredValidator}
                                                    disabled={!formRenderProps.valueGetter('date_begin') || disableAllFields}
                                                />
                                            </div>
                                        </div>
                                        <div className="application-form__row two-thirds-column">
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id={'national_breed_club_id'}
                                                            name={'national_breed_club_id'}
                                                            label={'Выберите НКП'}
                                                            component={FormComboBox}
                                                            textField={'name'}
                                                            data={exhibitionProperties.national_breed_clubs}
                                                            value={formRenderProps.valueGetter('national_breed_club_id')}
                                                            onChange={formRenderProps.onChange}
                                                            validationMessage="Обязательное поле"
                                                            disabled={formRenderProps.valueGetter('format_id').value !== 3}
                                                            required={formRenderProps.valueGetter('format_id').value === 3 ? true : false}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset className={'k-form-fieldset application-form__contacts'}>
                                        <div className="form-row mt-3">
                                            <div className="form-group col-md-8">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="Contacts__custom-label">Телефон</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <FieldArray
                                            id="phones"
                                            name="phones"
                                            component={FormContactsFieldArray}
                                            formRenderProps={formRenderProps}
                                            valueValidator={phoneValidator}
                                            valueRequiredValidator={phoneRequiredValidator}
                                        />

                                        <div className="form-row mt-3">
                                            <div className="form-group col-md-8">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="Contacts__custom-label">E-mail</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <FieldArray
                                            id="emails"
                                            name="emails"
                                            component={FormContactsFieldArray}
                                            formRenderProps={formRenderProps}
                                            valueValidator={value => emailValidator(value, 100)}
                                            valueRequiredValidator={emailRequiredValidator}
                                        />
                                    </fieldset>

                                    <div className="application-form__content">
                                        {editable && <AdditionalDocuments
                                            attachedDocuments={values.documents}
                                            documents={documents}
                                            setDocuments={setDocuments}
                                            history={history}
                                            clubAlias={clubAlias}
                                            handleError={handleError}
                                            setDisableSubmit={setDisableSubmit}
                                            formRenderProps={formRenderProps}
                                        />}
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
                                                //disabled={!formRenderProps.modified || !formRenderProps.valid || disableSubmit}
                                                disabled={!formRenderProps.modified || disableSubmit}
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
                style={{ position: 'fixed' }}
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

export default React.memo(ExhibitionsForm);