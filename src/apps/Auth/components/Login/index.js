import React from 'react'
// import {Link} from 'react-router-dom'
import LoginForm from 'apps/Auth/containers/LoginForm'
import CommonLayout from 'components/Layout/CommonRegistrationLogin'
import './style.scss'

export default function AuthorizationLayout() {
    return (
        <CommonLayout image={'/static/images/registration/banner.png'}>
            <div className="authorization__holder">
                <div className="authorization__logo"/>
                <div className="authorization__title">Добро пожаловать</div>
                <div className="authorization__subtitle">Профессиональный сервис для владельцев, клубов, заводчиков и
                    питомников
                </div>
                <LoginForm/>

                <div className="authorization__switch-to-login">
                    {/* Впервые на РКФ? <Link to="/auth/registration">Зарегистрироваться</Link> */}
                </div>
            </div>
        </CommonLayout>
    );
}