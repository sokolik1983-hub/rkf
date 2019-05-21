import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Login from 'apps/Auth/containers/Login'
import CommonLayout from 'components/Layout/CommonRegistrationLogin'
import './style.scss'

export default class AuthorizationLayout extends Component {
    state = {
        first_name: '',
        second_name: '',
        password: '',
        password_confirm: '',
        email: '',
        phone: '',
        phone_code: ''
    };

    render() {
        return (
            <CommonLayout image={'/static/images/registration/banner.png'}>
                <div className="authorization__holder">
                    <div className="authorization__logo"/>
                    <div className="authorization__title">Добро пожаловать на РКФ</div>
                    <div className="authorization__subtitle">Собачий сервис для владельцев, клубов, заводчиков и
                        питомников
                    </div>
                    <Login/>

                    <div className="authorization__switch-to-login">
                        Впервые на РКФ? <Link to="/auth/registration">Зарегистрироваться</Link>
                    </div>
                </div>
            </CommonLayout>
        );
    }
}