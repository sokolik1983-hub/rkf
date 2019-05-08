import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import RegistrationForm from 'apps/Registration/containers/Register'

import Tabs from "components/Tabs";
import {TabContent} from "components/Tabs";

import './style.scss'

export default class RegistrationLayout extends Component {

    render() {
        return (
            <div className="registration__wrap">
                <div className="registration__image"><img src="/static/images/registration/banner.png" alt=""/></div>
                <div className="registration__holder">
                    <div className="registration__logo"/>
                    <div className="registration__title">Регистрацая</div>
                    <Tabs className="registration__tabs">
                        <TabContent label="Я - владелец">
                            <RegistrationForm/>
                        </TabContent>
                        <TabContent label="Я - клуб">
                            <RegistrationForm legal/>
                        </TabContent>
                        <TabContent label="Я - питомник">
                            <RegistrationForm legal/>
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