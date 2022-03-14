import React, {memo, useState} from "react";
import {Link} from "react-router-dom";
import {Form, FormGroup, FormField, SubmitButton} from "../../../../Form";
import Error from "../../../../Form/Field/Error";
import CustomCheckbox from "../../../../Form/CustomCheckbox";
import {loginFormConfig} from "./config";
import {connectLogin} from "../../../../../pages/Login/connectors";
import "./index.scss";


const {fields} = loginFormConfig;

const LoginForm = ({loginUserSuccess}) => {
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
                    type={showPassword ? `text` : `password`}
                />
                <button
                    className={`login-page__form-psw ${showPassword ? `_show-psw` : ``}`}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                </button>
                <Error name="authentication" noTouch={true} />
            </FormGroup>
            <FormGroup inline>
                <CustomCheckbox
                    id="remember-me"
                    label="Запомнить меня"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                />
                <Link to="/recovery" className="login-page__recovery-link">Забыли пароль?</Link>
            </FormGroup>
            <div className="login-page__form-controls">
                <SubmitButton className="btn-primary btn-lg">Войти</SubmitButton>
            </div>
        </Form>
    )
};

export default connectLogin(memo(LoginForm));