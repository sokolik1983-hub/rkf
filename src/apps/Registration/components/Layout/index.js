import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Button from 'components/Button'
import InputPassword from 'components/Form/InputPassword'
import FormInput from 'components/Form/FormInput'
import FormGroup from 'components/Form/FormGroup'
import InputPhone from 'components/Form/InputPhone'
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
                    <div className= "registration__logo"/>
                    <div className="registration__title">Регистрацая</div>
                    <Tabs className="registration__tabs">
                        <TabContent label="Я - владелец">
                            <form>
                                <FormGroup inline>
                                    <FormInput>
                                        <label>Имя</label>
                                        <input
                                            className="form-input__input"
                                            type="text"
                                            placeholder="Иван"
                                        />
                                    </FormInput>
                                    <FormInput>
                                        <label>Фамилия</label>
                                        <input
                                            className="form-input__input"
                                            type="text"
                                            placeholder="Иванов"
                                        />
                                    </FormInput>
                                </FormGroup>
                                <FormGroup inline>
                                    <FormInput>
                                        <label>E-mail</label>
                                        <input
                                            className="form-input__input"
                                            type="email"
                                            placeholder="Ведите вашу личную почту"
                                        />
                                    </FormInput>
                                    <FormInput>
                                        <label>Пароль</label>
                                        <InputPassword
                                            className="form-input__input"
                                            placeholder="Минимум 8 символов"
                                        />
                                    </FormInput>
                                </FormGroup>
                                <FormGroup inline>
                                    <FormInput>
                                        <label>Телефон</label>
                                        <InputPhone
                                            className="form-input__input"
                                            type="text"
                                            placeholder="7 ( ) ___ __ __"
                                        />
                                    </FormInput>
                                    <FormInput>
                                        <label>Проверочный код</label>
                                        <input
                                            className="form-input__input"
                                            type="password"
                                            placeholder="******"
                                        />
                                    </FormInput>
                                </FormGroup>
                                <div className="form-controls">
                                    <Button className="btn-primary btn-lg">Зарегистрироваться</Button>
                                </div>
                            </form>
                        </TabContent>
                        <TabContent label="Я - заводчик">
                            Я - заводчик
                        </TabContent>
                        <TabContent label="Я - клуб">
                            Я - клуб
                        </TabContent>
                        <TabContent label="Я - питомник">
                            Я - питомник
                        </TabContent>
                    </Tabs>
                    <div className="registration__signature">
                        Нажимая кнопку «Зарегистрироваться», вы принимаете <Link to="/">Условия использования</Link> и&nbsp;<Link to="/">Политику конфиденциальности</Link>
                    </div>
                    <div className="registration__switch-to-login">
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </div>
                </div>
            </div>
        );
    }
}