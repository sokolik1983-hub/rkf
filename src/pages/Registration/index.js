import React, {memo} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {compose} from "redux";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Card from "../../components/Card";
import ScrollArea from "react-scrollbar";
import RegistrationForm from "../../components/Layouts/AuthLayout/components/RegistrationForm";
import CopyrightInfo from "../../components/CopyrightInfo";
import reducer from "../Login/reducer";
import injectReducer from "../../utils/injectReducer";
import {connectAuthVisible} from "../Login/connectors";
import {LOGIN_URL, REGISTRATION_URL} from "../../appConfig";
import "./index.scss";


const RegistrationPage = ({isAuthenticated}) => {
    return isAuthenticated ?
        <Redirect to="/" /> :
        <Layout login_page>
            <AuthLayout className="registration-page">
                <Card>
                    <div className="registration-page__content">
                        <div className="registration-page__tabs">
                            <NavLink exac="true" to={LOGIN_URL} className="login-page__tab">Вход</NavLink>
                            <NavLink exac="true" to={REGISTRATION_URL} className="login-page__tab">Регистрация</NavLink>
                        </div>
                        <ScrollArea
                            className="registration-page__scroll-wrap"
                            contentClassName="registration-page__scroll"
                            verticalScrollbarStyle={{borderRadius: 6, width: 6, backgroundColor: '#aaa'}}
                            verticalContainerStyle={{display: 'none'}}
                            horizontal={false}
                            smoothScrolling={true}
                        >
                            <RegistrationForm />
                        </ScrollArea>
                    </div>
                    <CopyrightInfo withSocials={true} />
                </Card>
            </AuthLayout>
        </Layout>
};

const withReducer = injectReducer({key: 'authentication', reducer: reducer});

export default compose(withReducer)(connectAuthVisible(memo(RegistrationPage)));