import React, { useState } from "react";
import ClubRegistration from "./components/ClubRegistration";
import Card from "components/Card";
import NurseryRegistration from "./components/NurseryRegistration";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import reducer from "../Login/reducer";
import injectReducer from "../../utils/injectReducer";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const Registration = () => {
    const [activeTab, setActiveTab] = useState('club');

    return (
        <Card>
            <h1 className="registration-page__title">Регистрация</h1>
            <div className="registration-page__tabs">
                <div className="registration-page__tabs-controls">
                    <div className={`registration-page__tab${activeTab === 'club' ? ' _active' : ''}`}
                        onClick={() => setActiveTab('club')}
                    >
                        Клуб
                        </div>
                    <div className={`registration-page__tab${activeTab === 'nursery' ? ' _active' : ''}`}
                        onClick={() => setActiveTab('nursery')}
                    >
                        Питомник
                            </div>
                    <div className={`registration-page__tab${activeTab === 'individual' ? ' _active' : ''}`}
                        //onClick={() => setActiveTab('individual')}
                        onClick={() => null}
                    >
                        Физическое лицо
                </div>
                </div>
                {activeTab === 'club' && <ClubRegistration />}
                {activeTab === 'nursery' && <NurseryRegistration />}
            </div>
        </Card>
    )
};


const RegistrationPage = ({ isAuthenticated }) => {
    return isAuthenticated ?
        <Redirect to={'/'} /> :
        <Layout>
            <AuthLayout className="login-page">
                <Registration />
            </AuthLayout>
        </Layout>
};

const withReducer = injectReducer({ key: 'authentication', reducer: reducer });

export default compose(withReducer)(connectAuthVisible(React.memo(RegistrationPage)));