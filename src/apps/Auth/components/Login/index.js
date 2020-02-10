import React from "react";
import {Link} from "react-router-dom";
import Layout from "../../../../components/Layouts";
import CommonLayout from "../../../../components/Layout/CommonRegistrationLogin";
import LoginForm from "../../containers/LoginForm";
import "./style.scss";


export default function AuthorizationLayout() {
    return (
        <Layout>
            <CommonLayout image={'/static/images/registration/banner.png'}>
                <div className="authorization__holder">
                    <div className="authorization__title">Добро пожаловать</div>
                    <LoginForm />
                    <div className="authorization__switch-to-login">
                        Впервые на РКФ? <Link className="link" to="/auth/registration">Зарегистрироваться</Link>
                    </div>
                </div>
            </CommonLayout>
        </Layout>
    );
}