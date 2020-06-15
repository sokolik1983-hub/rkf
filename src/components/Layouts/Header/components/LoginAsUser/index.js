import React from "react";
import {Form, FormField} from "../../../../Form";
import {loginForm} from "./config";
import "./index.scss";


const LoginAsUser = () => {

    return (
        <Form
            {...loginForm}
            className="login-as-user__form"
            onSuccess={() => null}
        >
            <FormField {...loginForm.fields.mail}/>
        </Form>
    )
};

export default React.memo(LoginAsUser);