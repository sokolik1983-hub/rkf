import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { Request } from "../../utils/request";
import { connectWidgetLogin } from "../Login/connectors";
import Feedback from "components/Feedback";
import { Form, FormField, FormGroup } from 'components/Form';
import { config, defaultFields } from './config';
import Alert from 'components/Alert';
import "./index.scss";

const NurseryActivation = ({ clubId, history, logOutUser }) => {
    const [fields, setFields] = useState(defaultFields);
    const [loaded, setLoaded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorText, setErrorText] = useState('');


    useEffect(() => {
        Promise.all([
            getFields()
        ])
            .then(() => setLoaded(true));
    }, []);

    const getFields = () => {
        return Request({
            url: '/api/nurseries/Nursery/nursery_registration_main_info'
        }, data => {
            const updatedFields = { ...fields };
            const { profile_id,
                owner_first_name,
                owner_last_name,
                owner_second_name,
                name,
                mail,
                folder_number,
                city_id,
                stamp_code,
                street_types,
                house_types,
                flat_types,
            } = data;

            updatedFields.ownerName.value = `${owner_last_name} ${owner_first_name} ${owner_second_name}`;
            updatedFields.nurseryName.value = name;
            updatedFields.mail.value = mail;
            updatedFields.folder_number.value = folder_number;
            updatedFields.stamp_code.value = stamp_code;

            updatedFields.city.value = city_id;

            setFields(...updatedFields);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };


    const handleSuccess = () => {
        setSuccessAlert(true);
        setSubmitting(false);
        logOutUser();
        history.push('/');
    };

    const handleError = (e) => {
        setSubmitting(false);
        setErrorText(`${
            e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`
            }`);
        setErrorAlert(true);
    };

    return (
        <Layout>
            <Container className="content NurseryActivation">
                {!loaded
                    ? <Loading />
                    : <>
                        <h2 style={{ textAlign: 'center' }}>ЗАЯВКА НА ПОДКЛЮЧЕНИЕ К ПОРТАЛУ RKF.ONLINE</h2>
                        <Card>
                            <Form {...config} onSuccess={handleSuccess} onError={handleError}>
                                <FormField {...fields.ownerName} />
                                <FormGroup inline>
                                    <FormField {...fields.city} />
                                    <FormField {...fields.postcode} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.street_type_id} />
                                    <FormField {...fields.street_name} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.house_type_id} />
                                    <FormField {...fields.house_name} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.flat_type_id} />
                                    <FormField {...fields.flat_name} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.phone} />
                                    <FormField {...fields.mail} />
                                </FormGroup>

                                <FormField {...fields.owner_specialist_rkf} />
                                <FormGroup inline>
                                    <FormField {...fields.owner_special_education} />
                                    <FormField {...fields.owner_speciality} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.owner_place_speciality} />
                                    <FormField {...fields.owner_date_speciality} />
                                </FormGroup>

                                <FormGroup inline>
                                    <FormField {...fields.nurseryName} />
                                    <FormField {...fields.registration_date} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.stamp_code} />
                                    <FormField {...fields.folder_number} />
                                    <FormField {...fields.experience_dog_breeding} />
                                </FormGroup>
                                <FormGroup inline>
                                    <FormField {...fields.breeds} />
                                    <FormField {...fields.puppies_total_count} />
                                </FormGroup>
                                <FormField {...fields.owner_ranks} />
                                <FormField {...fields.dogs_ranks} />
                                <FormField {...fields.certificate_registration_nursery_document} />
                                <FormField {...fields.certificate_registration_in_rkf_document} />
                                <FormField {...fields.certificate_special_education_document} />
                                <FormField {...fields.certificate_specialist_rkf_document} />
                                <FormField {...fields.certificate_honorary_title_document} />
                                {
                                    <div className="NurseryActivation__submit">
                                        {submitting && <Loading inline={true} />}
                                        <button type="submit" className="btn btn-simple" disabled={submitting}>Отправить</button>
                                    </div>
                                }
                            </Form>
                            {successAlert &&
                                <Alert
                                    title="Регистрация прошла успешно! =)"
                                    text={'На указанный e-mail отправлено письмо.'}
                                    autoclose={7.5}
                                    onOk={() => setSuccessAlert(false)}
                                />
                            }
                            {errorAlert &&
                                <Alert
                                    title={`Ошибка: ${errorText}`}
                                    text={'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.'}
                                    autoclose={7.5}
                                    onOk={() => setErrorAlert(false)}
                                />
                            }
                        </Card>
                        <p className="NurseryActivation__feedback-reminder">
                            В случае обнаружения ошибок или несоответствий - воспользуйтесь формой&nbsp;
                            <Feedback className="feedback-link" title="обратной связи" />
                        </p>
                    </>
                }
            </Container>
        </Layout>
    )
};

const mapStateToProps = state => ({
    clubId: state.authentication.profile_id
});

export default connect(mapStateToProps)(connectWidgetLogin(NurseryActivation));