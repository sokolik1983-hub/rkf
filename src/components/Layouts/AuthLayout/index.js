import React from "react";
import Container from "../Container";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const AuthLayout = ({img = DEFAULT_IMG.authPicture, className, children}) => (
    <Container className="content">
        <div className={`auth-layout${className ? ' ' + className : ''}`}>
            {/*<div className="auth-layout__title">*/}
            {/*    <h1>Добро пожаловать на Rkf.Online!</h1>*/}
            {/*    <p>Цифровую платформу Российского кинологического сообщества</p>*/}
            {/*</div>*/}
            <div className="auth-layout__content">
                {children}
            </div>
        </div>
    </Container>
);

export default React.memo(AuthLayout);