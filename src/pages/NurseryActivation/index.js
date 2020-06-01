import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import Feedback from "../../components/Feedback";
import { Form } from "../../components/Form";
import SubmitButton from "./SubmitButton";
import RenderFields from "./RenderFields";
import Alert from "../../components/Alert";
import { Request } from "../../utils/request";
import { connectWidgetLogin } from "../Login/connectors";
import { activationForm, defaultValues } from './config';
import "./index.scss";


const NurseryActivation = ({ history, logOutUser }) => {
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [streetTypes, setStreetTypes] = useState([]);
    const [houseTypes, setHouseTypes] = useState([]);
    const [flatTypes, setFlatTypes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        (() => Request({
            url: '/api/nurseries/Nursery/nursery_registration_main_info'
        }, data => {
            if (data) {
                const {
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
                    is_submitted
                } = data;

                setStreetTypes(street_types.map(item => ({ value: item.id, label: item.name })));
                setHouseTypes(house_types.map(item => ({ value: item.id, label: item.name })));
                setFlatTypes(flat_types.map(item => ({ value: item.id, label: item.name })));
                setInitialValues({
                    ...initialValues,
                    name,
                    owner_name: `${owner_last_name} ${owner_first_name}${owner_second_name ? ' ' + owner_second_name : ''}`,
                    city: city_id,
                    mail,
                    stamp_code,
                    folder_number
                });
                setIsSubmitted(is_submitted);
            }
            setLoaded(true);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, []);

    const transformValues = values => {
        const newValues = { ...values };
        delete newValues.name;
        delete newValues.owner_name;
        delete newValues.city;
        delete newValues.mail;
        delete newValues.stamp_code;
        delete newValues.folder_number;

        return newValues;
    };

    const handleSuccess = () => {
        setSuccessAlert(true);
        setSubmitting(false);
        logOutUser();
        history.push('/');
    };

    const handleError = e => {
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
            <Container className="content nursery-activation">
                {!loaded
                    ? <Loading />
                    : <>
                        {
                            isSubmitted
                                ? <h2 style={{ color: 'red' }}>Заявка находится на рассмотрении</h2>
                                : <h2>ЗАЯВКА НА ПОДКЛЮЧЕНИЕ К ПОРТАЛУ RKF.ONLINE</h2>
                        }
                        <Card>
                            <Form
                                {...activationForm}
                                initialValues={initialValues}
                                transformValues={transformValues}
                                onSuccess={handleSuccess}
                                onError={handleError}
                                className="nursery-activation__form"
                                withLoading={true}
                            >
                                <RenderFields
                                    streetTypes={streetTypes}
                                    houseTypes={houseTypes}
                                    flatTypes={flatTypes}
                                    isSubmitted={isSubmitted}
                                />
                                {
                                    !isSubmitted && <div className="nursery-activation__submit">
                                        {submitting && <Loading inline={true} />}
                                        <SubmitButton>Отправить</SubmitButton>
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
                        <p className="nursery-activation__feedback-reminder">
                            В случае обнаружения ошибок или несоответствий - воспользуйтесь формой&nbsp;
                            <Feedback className="feedback-link" title="обратной связи" />
                        </p>
                    </>
                }
            </Container>
        </Layout>
    )
};

export default connectWidgetLogin(React.memo(NurseryActivation));