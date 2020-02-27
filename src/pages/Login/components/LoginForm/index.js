import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Form, FormGroup, FormField, SubmitButton} from "../../../../components/Form";
import Error from "../../../../components/Form/Field/Error";
import CustomCheckbox from "../../../../components/Form/CustomCheckbox";
import {loginFormConfig} from "./config";
import {connectLogin} from "../../connectors";
import "./index.scss";


const {fields} = loginFormConfig;


const LoginForm = ({loginUserSuccess}) => {
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <Form
            className="login-page__form"
            initialValues={{email: '', password: ''}}
            onSuccess={loginUserSuccess}
            withLoading={true}
            {...loginFormConfig}
        >
            <FormGroup>
                <FormField
                    {...fields.email}
                />
                <FormField
                    {...fields.password}
                />
                <Error name="authentication" noTouch={true} />
            </FormGroup>
            <FormGroup>
                <CustomCheckbox
                    id="remember-me"
                    label="Запомнить меня"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                />
            </FormGroup>
            <div className="login-page__form-controls">
                <SubmitButton className="btn-primary btn-lg">Войти</SubmitButton>
            </div>
            <p className="login-page__registration">
                Впервые на РКФ? <Link className="link" to="/auth/registration">Зарегистрироваться</Link>
            </p>
        </Form>
    )
};

export default connectLogin(React.memo(LoginForm));