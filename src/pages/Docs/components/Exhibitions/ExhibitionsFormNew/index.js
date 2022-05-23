import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import {Field, FieldArray, Form, FormElement} from "@progress/kendo-react-form";
import {Fade} from "@progress/kendo-react-animation";
import {Notification, NotificationGroup} from "@progress/kendo-react-notification";
import {IntlProvider, loadMessages, LocalizationProvider} from "@progress/kendo-react-intl";
import AdditionalDocuments from "./components/AdditionalDocuments";
import FormContactsFieldArray from "./components/FormContactsFieldArray";
import Loading from "../../../../../components/Loading";
import Card from "../../../../../components/Card";
import FormDropDownList from "../../../../../components/kendo/Form/FormDropDownList";
import FormMultiSelect from "../../../../../components/kendo/Form/FormMultiSelect";
import FormTextArea from "../../../../../components/kendo/Form/FormTextArea";
import {DateInput} from "../../../../../components/materialUI/DateTime";
import {requiredValidator} from "../../../../../components/kendo/Form/validators";
import FormComboBox from "../../../../UserEditKendo/components/FormComboBox";

import {
    emailRequiredValidator,
    emailValidator,
    phoneRequiredValidator,
    phoneValidator
} from "../../../../UserEditKendo/validators";
import {Request} from "../../../../../utils/request";
import ruMessages from "../../../../../kendoMessages.json";

import "./index.scss";

loadMessages(ruMessages, 'ru');

const requiredMessage = 'Обязательное поле';
const requiredRankError = 'Исчерпан лимит по выбранным рангам';
const requiredNcpMessage = 'Максимальное количество НКП 30';

const ExhibitionsFormNew = ({ clubAlias, history, status }) => {
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [statusId, setStatusId] = useState(null);
    const [formProps, setFormProps] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [isRanksValid, setIsRanksValid] = useState(true);
    const [isNcpValid, setIsNcpValid] = useState(true);
    const [showCityWarning, setShowCityWarning] = useState(false);
    const [exhibitionProperties, setExhibitionProperties] = useState({
        formats: [],
        ranks: [],
        national_breed_clubs: [],
        forbidden_dates: [],
        cities: [],
        year_forbidden_nkp: [],
        year_forbidden_ranks: [],
        year_warning_ranks: [],
    });

    const [initialValues, setInitialValues] = useState({
        id: '',
        format_id: '',
        format_name: '',
        rank_ids: [],
        rank_name: '',
        city_id: '',
        city_name: '',
        date_begin: '',
        date_end: '',
        national_breed_club_ids: [],
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

    const currentYear =new Date().getFullYear(); //текущий год, на который нельзя регистрировать выставку, но на который могут приходить данные с бека

    useEffect(() => {
        Promise.all([
            getExhibitionProperties(),
            status && getExhibitionInfo()
        ]).then(() => setLoaded(true));
    }, []);

    const getExhibitionProperties = async () => {
        await Request({
            url: `/api/requests/exhibition_request/clubexhibitionrequest/exhibition_properties?isCreate=${true}`
        }, data => {
            if (data) {
                setExhibitionProperties({
                    ...exhibitionProperties,
                    formats: data.formats.map(d => ({ text: d.name, value: d.id })),
                    ranks: data.ranks.map(d => ({ text: d.name, value: d.id })),
                    national_breed_clubs: data.national_breed_clubs,
                    forbidden_dates: data.forbidden_dates,
                    cities: data.cities,
                    year_forbidden_nkp: data.year_forbidden_nkp,
                    year_rank_counters: data.year_rank_counters,
                    current_month: data.current_month,
                });
            } else {
                setError('Ошибка');
            }
        }, error => {
            handleError(error);
        });
    };

    const getExhibitionInfo = async () => {
        const paramsArr = history.location.pathname.split('/');
        const id = paramsArr[paramsArr.length - 1];

        await Request({
            url: `/api/requests/exhibition_request/clubexhibitionrequest?id=${id}`
        }, data => {
            let values = {};
            Object.keys(initialValues).forEach(key => {
                values[key] = data[key] || initialValues[key];
            });
            setInitialValues(values);
            setStatusId(data.status_id);
        }, error => {
            console.log(error);
            history.replace('/404');
        });

        if (status === 'view') {
            setDisableAllFields(true);
        }
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
            date_begin: moment(data.date_begin).format('YYYY-MM-DD'),
            date_end: moment(data.date_end).format('YYYY-MM-DD'),
            documents: data.documents.map(d => ({
                object_id: d.object_id ? d.object_id : null,
                name: d.name,
                document_id: d.document_id
            })),
            rank_ids: data.rank_ids?.map(rank => rank.value),
            national_breed_club_ids: data.national_breed_club_ids?.map(club_id => club_id.id),
        };
        delete newData.documents_upload;
        !status && delete newData.id;

        await Request({
            url: '/api/requests/exhibition_request/clubexhibitionrequest',
            method: status ? 'PUT' : 'POST',
            data: JSON.stringify(newData)
        }, () => {
            history.push(`/${clubAlias}/documents/exhibitions`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };

    const handleFormatChange = id => {
        formProps.onChange('format_id', id);
        formProps.onChange('rank_ids', []);
        formProps.onChange('documents', { value: [] });
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
    };

    const requiredRanksValidator = value => {
        //ранги без САС не валидируются
        //САС ранги 2 в год, третья только для труднодоступных регионов (показывается хинт)
        //групповые до 4-х включительно

        //получаю выбранный юзером год
        const pickedYear = formProps.valueGetter('date_begin') ? formProps.valueGetter('date_begin').substring(4, 0) : null;

        //получаю счетчик поданных заявок на выбранный год общий и по отдельным рангам
        let currentRankCounter = pickedYear ? exhibitionProperties?.year_rank_counters[pickedYear] : null;
        let registeredCACRanks = currentRankCounter?.filter(i => i.type_id === 1)[0]?.count === undefined ? 0 : currentRankCounter?.filter(i => i.type_id === 1)[0]?.count;
        let registeredGroupeRanks = currentRankCounter?.filter(i => i.type_id === 2)[0]?.count === undefined ? 0 : currentRankCounter?.filter(i => i.type_id === 2)[0]?.count;

        //отслеживаю выбранные юзером ранги всех типов, кроме "без САС"
        let pickedCAC_CHRKF = value?.slice().map(i => i.value).filter(i => i === 1) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 1).length;
        let pickedCAC_CHF = value?.slice().map(i => i.value).filter(i => i === 2) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 2).length;

        let pickedGroupe1 = value?.slice().map(i => i.value).filter(i => i === 10) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 10).length;
        let pickedGroupe2 = value?.slice().map(i => i.value).filter(i => i === 11) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 11).length;
        let pickedGroupe3 = value?.slice().map(i => i.value).filter(i => i === 12) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 12).length;
        let pickedGroupe4 = value?.slice().map(i => i.value).filter(i => i === 13) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 13).length;
        let pickedGroupe5 = value?.slice().map(i => i.value).filter(i => i === 14) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 14).length;
        let pickedGroupe6 = value?.slice().map(i => i.value).filter(i => i === 15) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 15).length;
        let pickedGroupe7 = value?.slice().map(i => i.value).filter(i => i === 16) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 16).length;
        let pickedGroupe8 = value?.slice().map(i => i.value).filter(i => i === 17) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 17).length;
        let pickedGroupe9 = value?.slice().map(i => i.value).filter(i => i === 18) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 18).length;
        let pickedGroupe10 = value?.slice().map(i => i.value).filter(i => i === 19) === undefined ? 0 : value?.slice().map(i => i.value).filter(i => i === 19).length;

        //вычисляю общее количество рангов на выбранный год
        let totalPickedCACRanks = pickedCAC_CHRKF + pickedCAC_CHF;
        let totalPickedGroupeRanks = pickedGroupe1 + pickedGroupe2 + pickedGroupe3 + pickedGroupe4 + pickedGroupe5 + pickedGroupe6 + pickedGroupe7 + pickedGroupe8 + pickedGroupe9 + pickedGroupe10;

        //вычисляю общее количество рангов на выбранный год с учётом ранее поданных
        let totalCAC = totalPickedCACRanks + registeredCACRanks;
        let totalGroupe = totalPickedGroupeRanks + registeredGroupeRanks;

        if ((totalPickedCACRanks && (totalCAC > 3)) || (totalPickedGroupeRanks && (totalGroupe > 4))) {
            setIsRanksValid(false)
        } else {
            setIsRanksValid(true)
        }

        if (totalPickedCACRanks && totalCAC === 3) {
            setShowCityWarning(true)
        } else {
            setShowCityWarning(false)
        }

        return !value ? requiredMessage : ((totalPickedCACRanks && (totalCAC > 3)) || (totalPickedGroupeRanks && (totalGroupe > 4))) ? requiredRankError : '';
    };

    const requiredNcpValidator = value => {
        if (value && value.length <= 30) {
            setIsNcpValid(true)
        } else if (value && value.length > 30) {
            setIsNcpValid(false)
        }
        return !value ? requiredMessage : value.length > 30 ? requiredNcpMessage : ''
    };

    return (
        <div className="application-form">
            <Card>
                <div className="club-documents-status__head">
                    <Link to={`/${clubAlias}/documents/exhibitions`} className="club-documents-status__head-link">Личный кабинет</Link>
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
                            const isCAC = formRenderProps.valueGetter('format_id') === 1;
                            const isCACIB = formRenderProps.valueGetter('format_id') === 2;
                            const ranksIds = formRenderProps.valueGetter('rank_ids');
                            const ncpIds = formRenderProps.valueGetter('national_breed_club_ids');
                            const pickedYear = formRenderProps.valueGetter('date_begin') ?
                                formRenderProps.valueGetter('date_begin').substring(4, 0):
                                null;

                            return (
                                <FormElement>
                                    <div className="application-form__content">
                                        {formRenderProps.valueGetter('rejected_comment') &&
                                            <p className="application-form__danger">{formRenderProps.valueGetter('rejected_comment')}</p>
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
                                                    defaultItem={status && formRenderProps.valueGetter('format_id')
                                                        ? { text: formRenderProps.valueGetter('format_name'), value: formRenderProps.valueGetter('format_id') }
                                                        : { text: "Выберите формат", value: 0 }
                                                    }
                                                    validator={requiredValidator}
                                                    disabled={!!status}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    className={isRanksValid ? '' : 'k-state-invalid'}
                                                    id="rank_ids"
                                                    name="rank_ids"
                                                    label="Ранг выставки"
                                                    selectType="rank"
                                                    component={FormMultiSelect}
                                                    data={exhibitionProperties.ranks}
                                                    defaultValue={formRenderProps.valueGetter('rank_ids')
                                                        ? formRenderProps.valueGetter('rank_ids')
                                                        : []
                                                    }
                                                    validator={isCAC ? requiredRanksValidator : null}
                                                    valid={isCAC
                                                        ? !!formRenderProps.valueGetter('rank_ids')?.length
                                                        : true
                                                    }
                                                    disabled={!isCAC || !!status}
                                                    resetValue={isCAC ? false : []}
                                                />
                                                {showCityWarning && <span>Только для труднодоступных городов из списка, утвержденных Президиумом РКФ</span>}
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
                                                            data={exhibitionProperties.cities}
                                                            placeholder={status ? formRenderProps.valueGetter('city_name') : ''}
                                                            onChange={formRenderProps.onChange}
                                                            validationMessage="Обязательное поле"
                                                            required={!status && !!formRenderProps.valueGetter('format_id')}
                                                            disabled={disableAllFields || statusId === 3 || !formRenderProps.valueGetter('format_id')}
                                                        />
                                                    </IntlProvider>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className="application-form__row two-column">
                                            <div className="application-form__row date-input__wrap">
                                                <Field
                                                    id="date_begin"
                                                    name="date_begin"
                                                    label="Дата начала проведения"
                                                    minDate={isCACIB ?
                                                        moment().add(1, 'y').set({'month': 12, 'date': 1}).format('YYYY-MM-DD')
                                                        : moment().add((exhibitionProperties?.current_month <= 4 ? 1 : 0), "y").set({'month': 12, 'date': 1}).format('YYYY-MM-DD')
                                                    }
                                                    component={DateInput}
                                                    value={formProps?.valueGetter('date_begin')}
                                                    onChange={date => formProps.onChange('date_begin', {
                                                        value: date,
                                                    })}
                                                    validator={dateRequiredValidator}
                                                    disabled={(!status && !formRenderProps.valueGetter('format_id')) || disableAllFields || statusId === 3}
                                                />
                                                <div className="custom-icon">
                                                    <span className="k-icon k-i-calendar"></span>
                                                </div>
                                            </div>
                                            <div className="application-form__row date-input__wrap">
                                                <Field
                                                    id="date_end"
                                                    name="date_end"
                                                    label="Дата окончания"
                                                    minDate={formRenderProps.valueGetter('date_begin')
                                                        ? formRenderProps.valueGetter('date_begin')
                                                        : null}
                                                    maxDate={formRenderProps.valueGetter('date_begin')
                                                        ? setMaxDate()
                                                        : null}
                                                    component={DateInput}
                                                    value={formProps?.valueGetter('date_end')}
                                                    onChange={date => formProps.onChange('date_end', {
                                                        value: date,
                                                    })}
                                                    validator={dateRequiredValidator}
                                                    disabled={!formRenderProps.valueGetter('date_begin') || disableAllFields || statusId === 3}
                                                />
                                                <div className="custom-icon">
                                                    <span className="k-icon k-i-calendar"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="application-form__row two-thirds-column">
                                            <div>
                                                <Field
                                                    className={isNcpValid ? '' : 'k-state-invalid'}
                                                    id="national_breed_club_ids"
                                                    name="national_breed_club_ids"
                                                    label="Выберите НКП"
                                                    selectType="ncp"
                                                    component={FormMultiSelect}
                                                    data={
                                                        Object.keys(exhibitionProperties.year_forbidden_nkp).length === 1 && exhibitionProperties.year_forbidden_nkp[currentYear]
                                                            ?
                                                            exhibitionProperties.national_breed_clubs
                                                            :
                                                            (Object.keys(exhibitionProperties.year_forbidden_nkp).length > 0 && pickedYear)
                                                                ?
                                                                exhibitionProperties.national_breed_clubs.filter(item => exhibitionProperties.year_forbidden_nkp[pickedYear]?.every(nkp => item.id !== nkp))
                                                                :
                                                                exhibitionProperties.national_breed_clubs
                                                    }
                                                    defaultValue={formRenderProps.valueGetter('national_breed_club_ids')
                                                        ? formRenderProps.valueGetter('national_breed_club_ids')
                                                        : []
                                                    }
                                                    valid={formRenderProps.valueGetter('format_id') === 3
                                                        ? !!formRenderProps.valueGetter('national_breed_club_ids')?.length
                                                        : true
                                                    }
                                                    disabled={!formRenderProps.valueGetter('date_begin') || formRenderProps.valueGetter('format_id') !== 3 || !!status}
                                                    validator={!status && formRenderProps.valueGetter('format_id') === 3 ? requiredNcpValidator : null}
                                                    resetValue={formRenderProps.valueGetter('format_id') === 3 ? false : []}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset className={`k-form-fieldset application-form__contacts${(status && (status === 'view')) || statusId === 3 ? ' _disabled' : ''}`}>
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
                                        {formRenderProps.valueGetter('format_id') === 2 &&
                                            <AdditionalDocuments
                                                documents={formRenderProps.valueGetter('documents')}
                                                handleError={handleError}
                                                setDisableSubmit={setDisableSubmit}
                                                formRenderProps={formRenderProps}
                                                editable={editable}
                                                status={status}
                                                dataType="international"
                                                docTypes={[{ text: 'Интернациональная', value: 99 }]}
                                            />
                                        }
                                        {ranksIds && !!ranksIds.length &&
                                            <AdditionalDocuments
                                                documents={formRenderProps.valueGetter('documents')}
                                                docTypes={ranksIds}
                                                formRenderProps={formRenderProps}
                                                setDisableSubmit={setDisableSubmit}
                                                handleError={handleError}
                                                editable={editable}
                                                status={status}
                                                dataType="ranksIds"
                                            />
                                        }
                                        {ncpIds && !!ncpIds.length &&
                                            <AdditionalDocuments
                                                documents={formRenderProps.valueGetter('documents')}
                                                docTypes={ncpIds}
                                                formRenderProps={formRenderProps}
                                                setDisableSubmit={setDisableSubmit}
                                                handleError={handleError}
                                                editable={editable}
                                                status={status}
                                                dataType="ncpIds"
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
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className="application-form__controls">
                                        {editable &&
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
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

export default React.memo(ExhibitionsFormNew);