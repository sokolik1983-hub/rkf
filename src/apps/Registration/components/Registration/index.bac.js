import React, {PureComponent} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Tabs,{TabContent} from "components/Tabs";
import CommonLayout from 'components/Layout/CommonRegistrationLogin'
import RegistrationForm from 'apps/Registration/containers/Register'
import Form from '../Form/Form'
import {
    PhysicalPerson,
    LegalEntity,
} from '../Form/FormFields'

import {
    registrationFormPhysicalPerson,
    registrationFormLegalEntity, registrationSuccessPath,
} from 'apps/Registration/config'

import './style.scss'

export default class Registration extends PureComponent {

    render() {

        return (

            <CommonLayout image={'/static/images/registration/banner.png'}>

                <div className="registration__logo"/>
                <div className="registration__title">Регистрация</div>
                <Tabs className="registration__tabs">
                    <TabContent label="Я - владелец">
                        <RegistrationForm
                            fields={registrationFormPhysicalPerson.fields}
                            validationSchema={registrationFormPhysicalPerson.validationSchema}
                        >
                            <PhysicalPerson/>
                        </RegistrationForm>
                    </TabContent>
                    <TabContent label="Я - клуб">
                        <Form
                            config={registrationFormLegalEntity}
                        >
                            <LegalEntity registrationType="2"/>
                        </Form>
                    </TabContent>
                    <TabContent label="Я - питомник">
                        <RegistrationForm
                            fields={registrationFormLegalEntity.fields}
                            validationSchema={registrationFormLegalEntity.validationSchema}
                        >
                            <LegalEntity registrationType="3"/>
                        </RegistrationForm>
                    </TabContent>
                </Tabs>
                <div className="registration__signature">
                    Нажимая кнопку «Зарегистрироваться», вы принимаете <Link to="/auth/registration/terms">Условия
                    использования</Link> и&nbsp;<Link to="/auth/registration/policy">Политику конфиденциальности</Link>
                </div>
                <div className="registration__switch-to-login">
                    Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
                </div>

            </CommonLayout>
        );
    }
}