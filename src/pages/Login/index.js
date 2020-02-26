import React from "react";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import LoginForm from "./components/LoginForm";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import {connectAuthVisible} from "./connectors";
import "./index.scss";


const LoginPage = ({isAuthenticated}) => (
    isAuthenticated ?
        <Redirect to={'/'}/> :
        <Layout>
            <AuthLayout className="login-page">
                <h2 className="login-page__title">Добро пожаловать</h2>
                <LoginForm/>
            </AuthLayout>
        </Layout>
);

const withReducer = injectReducer({key: 'authentication', reducer: reducer});

export default compose(withReducer)(connectAuthVisible(React.memo(LoginPage)));