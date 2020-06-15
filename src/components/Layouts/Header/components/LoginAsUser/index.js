import React from "react";
import {Form, FormField, SubmitButton} from "../../../../Form";
import {loginForm} from "./config";
import "./index.scss";


const LoginAsUser = () => {

    return (
        <>
            <h2 className="login-as-user__title">Войти, как клуб или питомник</h2>
            <Form
                {...loginForm}
                className="login-as-user__form"
                onSuccess={() => null}
            >
                <FormField {...loginForm.fields.mail}/>
                <SubmitButton type="submit" className="btn btn-primary">Войти</SubmitButton>
            </Form>
        </>
    )
};

export default React.memo(LoginAsUser);