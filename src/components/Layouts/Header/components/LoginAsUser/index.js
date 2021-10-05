import React, {useState} from "react";
import {Form, FormField, SubmitButton} from "../../../../Form";
import Alert from "../../../../Alert";
import {loginForm} from "./config";
import {connectLogin} from "../../../../../pages/Login/connectors";

const LoginAsUser = ({loginUserSuccess, history, closeModal}) => {
    const [alert, setAlert] = useState(false);

    const onSuccess = data => {
        loginUserSuccess(data);
        closeModal();
        history.replace('/');
    };

    const onError = () => {
        closeModal();
        setAlert(true);
    };

    return (
        <>
            <Form
                onClick={() => console.log('forma')}
                {...loginForm}
                className="login-as-user__form"
                onSuccess={onSuccess}
                onError={onError}
            >
                <FormField {...loginForm.fields.mail}/>
                <SubmitButton type="submit" className="btn btn-primary">Войти</SubmitButton>
            </Form>
            {alert &&
                <Alert
                    title="Произошла ошибка! =("
                    text="Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи."
                    okButton={true}
                    onOk={() => setAlert(false)}
                />
            }
        </>
    )
};

export default connectLogin(React.memo(LoginAsUser));