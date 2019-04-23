import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    RegistrationForm,
    RegistrationFormIP,
} from '../Form'
import Tabs from "components/Tabs";
import {TabContent} from "components/Tabs";

import './style.scss'

export default class RegistrationLayout extends Component {
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
            <div content className="registration__wrap">
                <div className="registration__image"><img src="/static/images/registration/banner.png"/></div>
                <div content className="registration__holder">
                    <div className="registration__logo"/>
                    <div className="registration__title">Регистрацая</div>
                    <Tabs className="registration__tabs">
                        <TabContent label="Я - владелец">
                            <RegistrationForm/>
                        </TabContent>
                        <TabContent label="Я - клуб">
                            <RegistrationFormIP/>
                        </TabContent>
                        <TabContent label="Я - питомник">
                            <RegistrationFormIP/>
                        </TabContent>
                    </Tabs>
                    <div className="registration__signature">
                        Нажимая кнопку «Зарегистрироваться», вы принимаете <Link to="/">Условия
                        использования</Link> и&nbsp;<Link to="/">Политику конфиденциальности</Link>
                    </div>
                    <div className="registration__switch-to-login">
                        Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
                    </div>
                </div>
            </div>
        );
    }
}