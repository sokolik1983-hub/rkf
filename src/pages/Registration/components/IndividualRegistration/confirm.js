import React, {useEffect, useState} from "react";
import Layout from "../../../../components/Layouts";
import AuthLayout from "../../../../components/Layouts/AuthLayout";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import {Request} from "../../../../utils/request";
import {connectAuthVisible} from "../../../Login/connectors";
import "../../index.scss";


const ConfirmIndividualRegistration = ({history, location, isAuthenticated}) => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if(location.search) {
            const alias = location.search.replace('?', '');

            (() => Request({
                url: `/api/registration/owner/activate?alias=${alias}`,
                method: "POST"
            }, data => {
                setMessage('Вы успешно зарегистрировались');
                setLoading(false);
            }, error => {
                if(error.response && error.response.status === 422) {
                    setMessage(Object.keys(error.response.data.errors).map(key => `${error.response.data.errors[key]}\n`).join(''));
                } else {
                    setMessage('Что-то пошло не так... Не удалось подтвердить e-mail. Попробуйте позже или воспользуйтесь обратной связью.');
                }
                setIsError(true);
                setLoading(false);
            }))();
        } else {
            history.replace('/');
        }
    }, []);

    if(isAuthenticated) history.replace('/');

    return loading ?
        <Loading/> :
        <Layout>
            <AuthLayout className="login-page">
                <Card>
                    <h1 className="registration-page__title">Регистрация</h1>
                    <p className={`registration-page__message${isError ? ' _error' : ''}`}>{message}</p>
                </Card>
            </AuthLayout>
        </Layout>
};

export default connectAuthVisible(React.memo(ConfirmIndividualRegistration));