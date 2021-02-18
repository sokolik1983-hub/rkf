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
    const [disableAllFields, setDisableAllFields] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [statusId, setStatusId] = useState(null);
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
        setExhibitionLoaded(false);
        await Request({
            url: `/api/requests/exhibition_request/clubexhibitionrequest/exhibition_fields?id=${id}`
        }, data => {
            let values = {};
            Object.keys(initialValues).forEach(key => {
                values[key] = data[key] || initialValues[key];
            });
            values.exhibition_id = id;
            setInitialValues(values);
            setExhibitionLoaded(true);
        }, error => {
            history.replace('/404');
        });
        // if (status === 'view') {
        //     setDisableAllFields(true);
        // }
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
            ...data,
            date_begin: moment(data.date_begin).format(),
            date_end: moment(data.date_end).format(),
            documents: data.documents.map(d => ({
                id: d.id ? d.id : null,
                name: d.name,
                document_id: d.document_id
            }))
        };
        delete newData.documents_upload;
        
        delete newData.city_name;
        delete newData.format_id;
        delete newData.format_name;
        delete newData.rank_id;
        delete newData.rank_name;
        delete newData.national_breed_club_id;
        delete newData.national_breed_club_name;
        delete newData.emails;
        delete newData.phones;
        
        

        !status && delete newData.id;
console.log(newData);
        // await Request({
        //     url: '/api/requests/exhibition_request/clubexhibitionrequest',
        //     method: status ? 'PUT' : 'POST',
        //     data: JSON.stringify(newData)
        // }, () => {
        //     history.push(`/${clubAlias}/documents/exhibitions`);
        // }, error => {
        //     handleError(error);
        //     setDisableSubmit(false);
        // });
    };

    const handleExhibitionChange = (name, { value }) => {
        if (value) {
            formProps.onChange(name, value);
            getExhibitionInfo(value);
        }
    };

    const handleFormatChange = id => {
        formProps.onChange('format_id', id);
        formProps.onChange('rank_id', { text: "Выберите формат", value: 0 });
        formProps.onChange('date_begin', '');
        formProps.onChange('date_end', '');
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

    const setMaxDate = () => {
        if (formProps && editable) {
            const startDate = new Date(formProps.valueGetter('date_begin'));
            return startDate ? new Date(startDate.setDate(startDate.getDate() + 7)) : null
        }
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
                        initialValues={initialValues}
                        key={JSON.stringify(initialValues)}
                        render={formRenderProps => {
                            if (!formProps) setFormProps(formRenderProps);
                            const isCACIB = formRenderProps.valueGetter('format_id') === 2;
                            const isCAC = formRenderProps.valueGetter('format_id') === 1;
                            return (
                                <FormElement>
                                    <div className="application-form__content">
                                        {formRenderProps.valueGetter('rejected_comment') &&
                                            <p className="application-form__danger">{formRenderProps.valueGetter('rejected_comment')}</p>
                                        }
                                        <h4 className="application-form__title" style={{ marginBottom: 0, marginTop: '20px' }}>
                                            {status ? status === 'edit' ? 'Редактирование заявки' : 'Просмотр заявки' : 'Добавление заявки'}
                                        </h4>
                                        <div className="application-form__row two-column">
                                            <div>
                                                <LocalizationProvider language="ru">
                                                    <IntlProvider locale="ru">
                                                        <FormComboBox
                                                            id={'exhibition_id'}
                                                            name={'exhibition_id'}
                                                            label={'Выберите выставку'}
                                                            component={FormComboBox}
                                                            textField={'name'}
                                                            data={exhibitions}
                                                            //clearButton={false}
                                                            onChange={handleExhibitionChange}
                                                            validationMessage="Обязательное поле"
                                                            disabled={exhibitionLoaded ? false : true}
                                                            value={formRenderProps.valueGetter('exhibition_id')}
                                                        //required={!status && formRenderProps.valueGetter('format_id') ? true : false}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="application-form__row three-column">
                                            <div>
                                                <Field
                                                    id="format_id"
                                                    name="format_id"
                                                    label="Формат мероприятия"
                                                    component={FormDropDownList}
                                                    onChange={handleFormatChange}
                                                    data={exhibitionProperties.formats}
                                                    defaultItem={status && formRenderProps.valueGetter('format_id')
                                                        ? { text: formRenderProps.valueGetter('format_name'), value: formRenderProps.valueGetter('format_id') }
                                                        : { text: "Выберите формат", value: 0 }
                                                    }
                                                    validator={requiredValidator}
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
                                                            validator={isCAC ? requiredValidator : null}
                                                            valid={isCAC
                                                                ? formRenderProps.valueGetter('rank_id')
                                                                : true}
                                                            disabled={true}
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
                                                            placeholder={status ? formRenderProps.valueGetter('city_name') : ''}
                                                            onChange={formRenderProps.onChange}
                                                            validationMessage="Обязательное поле"
                                                            required={formRenderProps.modified}
                                                            //disabled={disableAllFields || statusId === 3 || !formRenderProps.valueGetter('format_id')}
                                                            disabled={!formRenderProps.valueGetter('exhibition_id')}
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
                                                    //disabled={(!status && !formRenderProps.valueGetter('format_id')) || disableAllFields || statusId === 3}
                                                    disabled={!formRenderProps.valueGetter('exhibition_id')}
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
                                                        ? setMaxDate()
                                                        : null}
                                                    component={FormDatePicker}
                                                    validator={dateRequiredValidator}
                                                    //disabled={!formRenderProps.valueGetter('date_begin') || disableAllFields || statusId === 3}
                                                    disabled={!formRenderProps.valueGetter('exhibition_id')}
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
                                                            placeholder={formRenderProps.valueGetter('national_breed_club_name')
                                                                ? formRenderProps.valueGetter('national_breed_club_name') : ''}
                                                            onChange={formRenderProps.onChange}
                                                            validationMessage="Обязательное поле"
                                                            disabled={(formRenderProps.valueGetter('format_id') !== 3 || status) ? true : false}
                                                            required={!status && formRenderProps.valueGetter('format_id') === 3 ? true : false}
                                                            resetValue={formRenderProps.valueGetter('format_id') !== 3 ? true : false}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset className={`k-form-fieldset application-form__contacts${disableAllFields ? ' _disabled' : ''}`}>
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
                                            disableAllFields={disableAllFields}
                                        />
                                    }
                                        {editable && statusId !== 3 &&
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
                                            <button
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