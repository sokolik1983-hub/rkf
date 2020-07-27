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
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [working, setWorking] = useState(false);
    const [rejectedComment, setRejectedComment] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

    useEffect(() => {
        Promise.all([getInfo(), getAddresses()])
            .then(() => setLoaded(true))
            .catch(e => handleError(e));
    }, []);

    const getInfo = () => PromiseRequest('/api/requests/NurseryRegistrationRequest')
        .then(data => {
            if (data) {
                const {
                    owner_first_name,
                    owner_last_name,
                    owner_second_name,
                    city_id,
                    status_id,
                    rejected_comment
                } = data;

                !data.breeds && delete data.breeds; // Backend workaround

                setInitialValues({
                    ...initialValues,
                    ...data,
                    owner_name: `${owner_last_name} ${owner_first_name}${owner_second_name ? ' ' + owner_second_name : ''}`,
                    city: city_id
                });

                if (status_id === 1) setIsSubmitted(true);
                if (status_id === 2) {
                    setShowAlert({
                        title: "Ваша заявка была отклонена!",
                        text: "Вы можете внести исправления и отправить её повторно.",
                        autoclose: 5,
                        onOk: () => setShowAlert(false)
                    });
                    setIsSubmitted(false);
                    setRejectedComment(rejected_comment);
                }
                if (status_id === 3) {
                    setShowAlert({
                        title: "Ваша заявка была одобрена!",
                        text: "Теперь Вы можете войти в свой личный кабинет на сайте.",
                        autoclose: 3,
                        onOk: () => {
                            setShowAlert(false);
                            logOutUser();
                            history.push('/');
                        }
                    });
                }

            }
        });

    const getAddresses = () => PromiseRequest('/api/Address/all_address_types')
        .then(data => {
            if (data) {
                const { street_types, house_types, flat_types } = data;
                setStreetTypes(street_types.map(item => ({ value: item.id, label: item.name })));
                setHouseTypes(house_types.map(item => ({ value: item.id, label: item.name })));
                setFlatTypes(flat_types.map(item => ({ value: item.id, label: item.name })));
            }
        });

    const transformValues = values => {
        const newValues = { ...values };
        delete newValues.name;
        delete newValues.owner_name;
        delete newValues.city;
        delete newValues.stamp_code;
        delete newValues.folder_number;

        delete newValues.certificate_registration_nursery;
        delete newValues.certificate_registration_in_rkf;
        delete newValues.certificate_special_education;
        delete newValues.certificate_specialist_rkf;
        delete newValues.certificate_honorary_title;

        return newValues;
    };

    const handleSuccess = () => {
        setShowAlert({
            title: "Заявка успешно отправлена!",
            autoclose: 7.5,
            onOk: () => {
                setShowAlert(false);
                logOutUser();
                history.push('/');
            }
        });
    };

    const handleError = e => {
        if(e.response) {
            let errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setShowAlert({
                title: `Ошибка: ${errorText}`,
                text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
                autoclose: 7.5,
                onOk: () => setShowAlert(false)
            });
        }
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
                        {rejectedComment && <Card><h3 className="nursery-activation__rejected-comment">{rejectedComment}</h3></Card>}
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
                                    working={working}
                                    setWorking={setWorking}
                                />
                                {
                                    !isSubmitted && <div className={`nursery-activation__submit${working ? ' working' : ''}`}>
                                        <SubmitButton>Отправить</SubmitButton>
                                    </div>
                                }
                            </Form>
                        </Card>
                        <p className="nursery-activation__feedback-reminder">
                            В случае обнаружения ошибок или несоответствий - воспользуйтесь формой&nbsp;
                            <Feedback className="feedback-link" title="обратной связи" />
                        </p>
                    </>
                }
                {showAlert && <Alert {...showAlert} />}
            </Container>
        </Layout>
    )
};

export default connectWidgetLogin(React.memo(NurseryActivation));