import React from "react";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import LoginForm from "./components/LoginForm";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import { connectAuthVisible } from "./connectors";

const LoginPage = ({ isAuthenticated, is_active_profile, user_type }) => {

    if (isAuthenticated) {
        if (!is_active_profile && user_type === 3) return <Redirect to={'/not-confirmed'} />
        if (!is_active_profile && user_type === 4) return <Redirect to={'/nursery/activation'} />
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <AuthLayout className="login-page">
                <LoginForm />
            </AuthLayout>
        </Layout>
    );
};

const withReducer = injectReducer({ key: 'authentication', reducer: reducer });

export default compose(withReducer)(connectAuthVisible(React.memo(LoginPage)));