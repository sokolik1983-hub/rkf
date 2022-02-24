import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Form, Field, FieldArray, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import Loading from "../../../components/Loading";
import Card from "../../../components/Card";
import AdditionalDocuments from "../../Docs/components/Exhibitions/ExhibitionsForm/components/AdditionalDocuments";
import { Request } from "../../../utils/request";
import ruMessages from "../../../kendoMessages.json"
// import "./index.scss";

loadMessages(ruMessages, 'ru');

const ClubForm = ({ clubAlias, history, status, isEditPage }) => {
    const [disableAllFields, setDisableAllFields] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [statusId, setStatusId] = useState(null);
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
        id: '',
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

    // useEffect(() => {
    //     Promise.all([
    //         getExhibitionProperties(),
    //         status && getExhibitionInfo()
    //     ]).then(() => setLoaded(true));
    // }, []);
    //
    // const getExhibitionProperties = async () => {
    //     await Request({
    //         url: `/api/requests/exhibition_request/clubexhibitionrequest/exhibition_properties`
    //     }, data => {
    //         if (data) {
    //             setExhibitionProperties({
    //                 ...exhibitionProperties,
    //                 formats: data.formats.map(d => ({ text: d.name, value: d.id })),
    //                 ranks: data.ranks.map(d => ({ text: d.name, value: d.id })),
    //                 national_breed_clubs: data.national_breed_clubs,
    //                 forbidden_dates: data.forbidden_dates,
    //                 cities: data.cities
    //             });
    //         } else {
    //             setError('Ошибка');
    //         }
    //     }, error => {
    //         handleError(error);
    //     });
    // };
    //
    // const getExhibitionInfo = async () => {
    //     const paramsArr = history.location.pathname.split('/');
    //     const id = paramsArr[paramsArr.length - 1];
    //
    //     await Request({
    //         url: `/api/requests/exhibition_request/clubexhibitionrequest?id=${id}`
    //     }, data => {
    //         let values = {};
    //         Object.keys(initialValues).forEach(key => {
    //             values[key] = data[key] || initialValues[key];
    //         });
    //         setInitialValues(values);
    //         setStatusId(data.status_id);
    //     }, error => {
    //         console.log(error);
    //         history.replace('/404');
    //     });
    //
    //     if (status === 'view') {
    //         setDisableAllFields(true);
    //     }
    // }



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
                id: d.id ? d.id : null,
                name: d.name,
                document_id: d.document_id
            }))
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

    return (
        <div className="application-form">
            <Card>
                <div className="club-documents-status__head">
                    <Link to={`/${clubAlias}/documents/exhibitions`} className="club-documents-status__head-link">Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    <span className="user-documents__breadcrumbs-item">Подача заявки на проведение выставки</span>
                </div>
                {
                    <Form
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        key={JSON.stringify(initialValues)}
                        render={formRenderProps => {
                            if (!formProps) setFormProps(formRenderProps);
                            // const isCACIB = formRenderProps.valueGetter('format_id') === 2;
                            // const isCAC = formRenderProps.valueGetter('format_id') === 1;
                            return (
                                <FormElement>
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
                                        />
                                    }
                                        {/*{editable &&*/}
                                        {/*    <div className="application-form__row">*/}
                                        {/*        <Field*/}
                                        {/*            id="comment"*/}
                                        {/*            name="comment"*/}
                                        {/*            label="Комментарий к заявке"*/}
                                        {/*            maxLength={500}*/}
                                        {/*            component={FormTextArea}*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*}*/}
                                    </div>
                                    {/*<div className="application-form__controls">*/}
                                    {/*    {editable &&*/}
                                    {/*        <button*/}
                                    {/*            type="submit"*/}
                                    {/*            className="btn btn-primary"*/}
                                    {/*            disabled={!formRenderProps.modified || disableSubmit}*/}
                                    {/*        >Отправить</button>*/}
                                    {/*    }*/}
                                    {/*</div>*/}
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

export default React.memo(ClubForm);