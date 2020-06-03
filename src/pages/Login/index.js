import React from "react";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import LoginForm from "./components/LoginForm";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import { connectAuthVisible } from "./connectors";


const LoginPage = ({ isAuthenticated }) => {
    return isAuthenticated ?
        <Redirect to={'/'} /> :
        <Layout>
            <AuthLayout className="login-page">
                <LoginForm />
            </AuthLayout>
        </Layout>
};

const withReducer = injectReducer({ key: 'authentication', reducer: reducer });

export default compose(withReducer)(connectAuthVisible(React.memo(LoginPage)));