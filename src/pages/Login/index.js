import React, {memo} from "react";
import {compose} from "redux";
import {NavLink, Redirect} from "react-router-dom";
import ls from "local-storage";
import ScrollArea from "react-scrollbar";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Card from "../../components/Card";
import LoginForm from "../../components/Layouts/AuthLayout/components/LoginForm";
import CopyrightInfo from "../../components/CopyrightInfo";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import {connectAuthVisible} from "./connectors";
import {LOGIN_URL, REGISTRATION_URL} from "../../appConfig";
import "./index.scss";


const LoginPage = ({isAuthenticated, is_active_profile, user_type}) => {
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';

    if (isAuthenticated) {
        if (!is_active_profile && user_type === 3) return <Redirect to="/not-confirmed" />
        if (!is_active_profile && user_type === 4) return <Redirect to="/kennel/activation" />


        if (is_active_profile && user_type === 0){
            return <Redirect to={`/${alias}`}/>
        } else if (is_active_profile && user_type === 0 && alias === 'rkf-online'){
            return <Redirect to={`/club/${alias}`}/>
        } else if (user_type === 1) {
            return <Redirect to={`/user/${alias}`}/>
        } else if (is_active_profile && user_type === 3 && alias !== 'rkf') {
            return <Redirect to={`/club/${alias}`} />
        } else if (is_active_profile && user_type === 4) {
            return <Redirect to={`/kennel/${alias}`} />
        } else if (is_active_profile && (user_type === 5 || alias === 'rkf')) {
            return <Redirect to={`/${alias}`}/>
        } else if (user_type === 7) {
            return <Redirect to={`/nbc/${alias}`}/>
        } else {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout login_page>
            <AuthLayout className="login-page">
                <Card>
                    <div className="login-page__content">
                        <div className="login-page__tabs">
                            <NavLink exac="true" to={LOGIN_URL} className="login-page__tab">Вход</NavLink>
                            <NavLink exac="true" to={REGISTRATION_URL} className="login-page__tab">Регистрация</NavLink>
                        </div>
                        <ScrollArea
                            className="login-page__scroll-wrap"
                            contentClassName="login-page__scroll"
                            verticalScrollbarStyle={{borderRadius: 6, width: 6, backgroundColor: '#aaa'}}
                            verticalContainerStyle={{borderRadius: 8, width: 8}}
                            horizontal={false}
                            smoothScrolling={true}
                        >
                            <LoginForm/>
                        </ScrollArea>
                    </div>
                    <CopyrightInfo withSocials={true} />
                </Card>
            </AuthLayout>
        </Layout>
    );
};

const withReducer = injectReducer({key: 'authentication', reducer: reducer});

export default compose(withReducer)(connectAuthVisible(memo(LoginPage)));