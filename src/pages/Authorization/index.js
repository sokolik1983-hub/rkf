import React from "react";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import ls from "local-storage";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { connectAuthVisible } from "./connectors";


const Authorization = ({ isAuthenticated, is_active_profile, user_type }) => {
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';

    if (isAuthenticated) {
        if (!is_active_profile && user_type === 3) return <Redirect to="/not-confirmed" />
        if (!is_active_profile && user_type === 4) return <Redirect to="/kennel/activation" />

        if (is_active_profile && user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online') {
            return <Redirect to={`/club/${alias}`} />
        } else if (is_active_profile && (user_type === 5 || alias === 'rkf' || alias === 'rkf-online')) {
            return <Redirect to={`/${alias}`} />
        } else if (is_active_profile && user_type === 4) {
            return <Redirect to={`/kennel/${alias}`} />
        } else if (user_type === 1) {
            return <Redirect to={`/user/${alias}`} />
        } else {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout login_page>
            <AuthLayout className="login-page">

            </AuthLayout>
        </Layout>
    );
};

const withReducer = injectReducer({ key: 'authentication', reducer: reducer });

export default compose(withReducer)(connectAuthVisible(React.memo(Authorization)));