import React from "react";
import {Form, FormField, SubmitButton} from "../../../../Form";
import {loginForm} from "./config";
import {connectLogin} from "../../../../../pages/Login/connectors";
import "./index.scss";


const LoginAsUser = ({loginUserSuccess, history, closeModal}) => {
    const onSuccess = data => {
        loginUserSuccess(data);
        closeModal();
        history.replace('/');
    };

    return (
        <>
            <h2 className="login-as-user__title">Войти как клуб или питомник</h2>
            <Form
                {...loginForm}
                className="login-as-user__form"
                onSuccess={onSuccess}
            >
                <FormField {...loginForm.fields.mail}/>
                <SubmitButton type="submit" className="btn btn-primary">Войти</SubmitButton>
            </Form>
        </>
    )
};

export default connectLogin(React.memo(LoginAsUser));