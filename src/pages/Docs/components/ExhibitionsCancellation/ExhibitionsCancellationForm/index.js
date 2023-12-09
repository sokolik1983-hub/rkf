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

loadMessages(ruMessages, 'ru');

const ExhibitionsForm = ({ clubAlias, history, status }) => {
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formProps, setFormProps] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [exhibitions, setExhibitions] = useState([]);
    const [exhibitionLoaded, setExhibitionLoaded] = useState(true);
    const [exhibitionProperties, setExhibitionProperties] = useState({
        formats: [],
        ranks: [],
        national_breed_clubs: [],
        forbidden_dates: [],
        cities: []
    });
    const [initialValues, setInitialValues] = useState({
        id: '',
        exhibition_id: '',
        name: '',
        type_id: '',
        status_id: '',
        format_id: '',
        format_name: '',
        rank_id: '',
        rank_name: '',
        city_id: '',
        city_name: '',
        date_begin: '',
        date_end: '',
        national_breed_club_id: '',
        national_breed_club_name: '',
        breed_id: '',
        breed_name: '',
        comment: '',
        rejected_comment: '',
        documents: [],
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
    const editable = !status || status !== 'view';

    useEffect(() => {
        Promise.all([
            getExhibitionProperties(),
            getExhibitions(),
            status && getExhibitionInfo()
        ]).then(() => setLoaded(true));
    }, []);

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

    const getExhibitions = async () => {
        await Request({
            url: `/api/exhibitions/exhibition/approved`
        }, data => {
            setExhibitions(data);
        }, error => {
            history.replace('/404');
        });
    }

    const getExhibitionInfo = async id => {
        let exhibitionId;
        if (status) {
            const paramsArr = history.location.pathname.split('/');
            exhibitionId = paramsArr[paramsArr.length - 1];
        } else {
            exhibitionId = id;
        }

        setExhibitionLoaded(false);
        await Request({
            url: status
                ? `/api/requests/exhibition_request/clubexhibitionrequest?id=${exhibitionId}`
                : `/api/requests/exhibition_request/clubexhibitionrequest/exhibition_fields?id=${exhibitionId}`
        }, data => {
            let values = {};
            Object.keys(initialValues).forEach(key => {
                values[key] = data[key] || initialValues[key];
            });
            values.exhibition_id = exhibitionId;
            values.breed_name = data.breed_name ? data.breed_name : '';
            setInitialValues(values);
            setExhibitionLoaded(true);
        }, error => {
            history.replace('/404');
        });
    }

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
        setDisableSubmit(true);
        let newData = {
            exhibition_id: data.exhibition_id,
            type_id: data.type_id,
            city_id: data.city_id,
            comment: data.comment,
            date_begin: moment(data.date_begin).format('YYYY-MM-DD'),
            date_end: moment(data.date_end).format('YYYY-MM-DD'),
            documents: data.documents.map(d => ({
                id: d.id ? d.id : null,
                name: d.name,
                document_id: d.document_id
            }))
        };
        if (status) {
            delete newData.exhibition_id;
            newData.id = data.exhibition_id;
        }
        await Request({
            url: '/api/requests/exhibition_request/clubexhibitionrequest/change_cancel',
            method: status ? 'PUT' : 'POST',
            data: JSON.stringify(newData)
        }, () => {
            history.push(`/${clubAlias}/documents/exhibitions`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };

    const handleExhibitionChange = (name, { value }) => {
        if (value) {
            getExhibitionInfo(value);
        }
    };

    const dateRequiredValidator = value => {
        if (formProps && value) {
            const stopDates = exhibitionProperties.forbidden_dates;
            const getDate = (type) => moment(new Date(formProps.valueGetter(type)).toLocaleDateString());
            const startDate = getDate('date_begin');
            const endDate = getDate('date_end');
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

    const setMaxDate = (d) => {
        const startDate = new Date(d);
        return startDate ? new Date(startDate.setDate(startDate.getDate() + 7)) : null
    }

    return (
        <div className="application-form">
            <Card>
                <div className="club-documents-status__head">
                    <Link to={`/${clubAlias}/documents/exhibitions`} className="club-documents-status__head-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Подача заявки на перенос/отмену выставки</span>
                </div>
                {!loaded ?
                    <Loading centered={false} /> :
                    <Form
                        onSubmit={handleSubmit}
                        key={JSON.stringify(initialValues)}
                        initialValues={initialValues}
                        render={formRenderProps => {
                            if (!formProps) setFormProps(formRenderProps);
                            const isCancelation = editable && formRenderProps.valueGetter('type_id') === 3;
                            return (
                                <FormElement>
                                    <div className="application-form__content">
                                        {formRenderProps.valueGetter('rejected_comment') &&
                                            <p className="application-form__danger">{formRenderProps.valueGetter('rejected_comment')}</p>
                                        }
                                        <h4 className="application-form__title" style={{ marginBottom: 0, marginTop: '20px' }}>
                                            {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                        </h4>
                                        <div className="application-form__row two-thirds-column">
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id="exhibition_id"
                                                            name="exhibition_id"
                                                            label="Выберите выставку"
                                                            component={FormComboBox}
                                                            textField="name"
                                                            data={exhibitions}
                                                            onChange={handleExhibitionChange}
                                                            placeholder={formRenderProps.valueGetter('name') ? formRenderProps.valueGetter('name') : ''}
                                                            validationMessage="Обязательное поле"
                                                            disabled={(!status && !exhibitionLoaded) || status ? true : false}
                                                            value={formRenderProps.valueGetter('exhibition_id')}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <Field
                                                    id="type_id"
                                                    name="type_id"
                                                    label="Выберите тип заявки"
                                                    component={FormDropDownList}
                                                    data={[{ text: 'Перенос', value: 2 }, { text: 'Отмена', value: 3 }]}
                                                    disabled={!formRenderProps.valueGetter('exhibition_id') || status}
                                                    validator={requiredValidator}
                                                />
                                            </div>
                                        </div>
                                        <div className="application-form__row three-column">
                                            <div>
                                                <Field
                                                    id="format_id"
                                                    name="format_id"
                                                    label="Формат мероприятия"
                                                    component={FormDropDownList}
                                                    data={exhibitionProperties.formats}
                                                    defaultItem={status && formRenderProps.valueGetter('format_id')
                                                        ? { text: formRenderProps.valueGetter('format_name'), value: formRenderProps.valueGetter('format_id') }
                                                        : { text: "Выберите формат", value: 0 }
                                                    }
                                                    disabled={true}
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
                                                            defaultItem={formRenderProps.valueGetter('rank_id')
                                                                ? { text: formRenderProps.valueGetter('rank_name'), value: formRenderProps.valueGetter('rank_id') }
                                                                : { text: "Выберите ранг", value: 0 }
                                                            }
                                                            disabled={true}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id="city_id"
                                                            name="city_id"
                                                            label="Город проведения выставки"
                                                            component={FormComboBox}
                                                            textField="name"
                                                            clearButton={false}
                                                            data={exhibitionProperties.cities}
                                                            onChange={formRenderProps.onChange}
                                                            validationMessage="Обязательное поле"
                                                            required={formRenderProps.modified}
                                                            value={formRenderProps.valueGetter('city_id')}
                                                            disabled={!formRenderProps.valueGetter('exhibition_id') || !editable || isCancelation
                                                                || formRenderProps.valueGetter('status_id') === 3}
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
                                                    min={new Date(new Date().getFullYear(), 12, 1)}
                                                    component={FormDatePicker}
                                                    validator={dateRequiredValidator}
                                                    disabled={!formRenderProps.valueGetter('exhibition_id') || !editable || isCancelation
                                                        || formRenderProps.valueGetter('status_id') === 3}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    id="date_end"
                                                    name="date_end"
                                                    label="Дата окончания"
                                                    min={formRenderProps.valueGetter('date_begin')
                                                        ? new Date(formRenderProps.valueGetter('date_begin'))
                                                        : null}
                                                    max={formRenderProps.valueGetter('date_begin')
                                                        ? setMaxDate(formRenderProps.valueGetter('date_begin'))
                                                        : null}
                                                    component={FormDatePicker}
                                                    validator={dateRequiredValidator}
                                                    disabled={!formRenderProps.valueGetter('exhibition_id') || !editable || isCancelation
                                                        || formRenderProps.valueGetter('status_id') === 3}
                                                />
                                            </div>
                                        </div>
                                        <div className="application-form__row two-column">
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id="national_breed_club_id"
                                                            name="national_breed_club_id"
                                                            label="Выберите НКП"
                                                            component={FormComboBox}
                                                            textField="name"
                                                            data={exhibitionProperties.national_breed_clubs}
                                                            placeholder={formRenderProps.valueGetter('national_breed_club_name')
                                                                ? formRenderProps.valueGetter('national_breed_club_name') : ''}
                                                            onChange={formRenderProps.onChange}
                                                            disabled={true}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id="breed_id"
                                                            name="breed_id"
                                                            label="Порода"
                                                            component={FormComboBox}
                                                            textField="name"
                                                            data={[]}
                                                            placeholder={formRenderProps.valueGetter('breed_name')
                                                                ? formRenderProps.valueGetter('breed_name') : ''}
                                                            //onChange={formRenderProps.onChange}
                                                            disabled={true}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset className="k-form-fieldset application-form__contacts _disabled">
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
                                        />
                                    </fieldset>

                                    <div className="application-form__content">{
                                        <AdditionalDocuments
                                            documents={formRenderProps.valueGetter('documents')}
                                            history={history}
                                            clubAlias={clubAlias}
                                            handleError={handleError}
                                            setDisableSubmit={setDisableSubmit}
                                            formRenderProps={formRenderProps}
                                            editable={editable}
                                            status={status}
                                            disabled={!formRenderProps.valueGetter('exhibition_id')}
                                        />
                                    }
                                        {editable &&
                                            <div className="application-form__row">
                                                <Field
                                                    id="comment"
                                                    name="comment"
                                                    label="Комментарий к заявке"
                                                    maxLength={500}
                                                    component={FormTextArea}
                                                    disabled={!formRenderProps.valueGetter('exhibition_id')}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className="application-form__controls">
                                        {exhibitionLoaded ?
                                            editable && <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!formRenderProps.modified || disableSubmit}
                                            >Отправить</button>
                                            : <Loading inline={true} />
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