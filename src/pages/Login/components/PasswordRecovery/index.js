import React, {useState} from "react";
import Layout from "../../../../components/Layouts";
import AuthLayout from "../../../../components/Layouts/AuthLayout";
import {Form, FormField, SubmitButton} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import {PassRecoveryForm} from "./config";
import "./index.scss";


const PasswordRecovery = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const onError = error => {
        if(error.response && error.response.data && error.response.data.errors) {
            setError(error.response.data.errors.error);
        }
    };

    return (
        <Layout>
            <AuthLayout className="password-recovery">
                {!success ?
                    <>
                        <h2 className="password-recovery__title">Забыли пароль?</h2>
                        <p className="password-recovery__subtitle">Введите адрес электронной почты, на который вы зарегистрировались. Мы вышлем вам инструкции.</p>
                        <Form
                            className="login-page__form"
                            onSuccess={() => setSuccess(true)}
                            onError={onError}
                            withLoading={true}
                            {...PassRecoveryForm}
                        >
                            <FormField {...PassRecoveryForm.fields.mail} />
                            <SubmitButton className="btn btn-primary">Отправить</SubmitButton>
                        </Form>
                    </> :
                    <>
                        <h2 className="password-recovery__title">Новый пароль отправлен</h2>
                        <p className="password-recovery__subtitle">Пожалуйста, проверьте свою электронную почту, чтобы продолжить.</p>
                    </>
                }
                {error &&
                    <Alert
                        title="Ошибка!"
                        text={error}
                        onOk={() => setError(null)}
                    />
                }
            </AuthLayout>
        </Layout>
    )
};

export default React.memo(PasswordRecovery);