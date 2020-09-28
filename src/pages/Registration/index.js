import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Card from "../../components/Card";
import ClubRegistration from "./components/ClubRegistration";
import NurseryRegistration from "./components/NurseryRegistration";
import IndividualRegistration from "./components/IndividualRegistration";
import reducer from "../Login/reducer";
import injectReducer from "../../utils/injectReducer";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const RegistrationPage = ({ isAuthenticated, history }) => {
    const [activeTab, setActiveTab] = useState('club');

    return isAuthenticated ?
        <Redirect to={'/'} /> :
        <Layout>
            <AuthLayout className="login-page">
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
                                 onClick={() => setActiveTab('individual')}
                            >
                                Физическое лицо
                            </div>
                        </div>
                        {activeTab === 'club' && <ClubRegistration/>}
                        {activeTab === 'nursery' && <NurseryRegistration/>}
                        {activeTab === 'individual' && <IndividualRegistration history={history}/>}
                    </div>
                </Card>
            </AuthLayout>
        </Layout>
};

const withReducer = injectReducer({ key: 'authentication', reducer: reducer });

export default compose(withReducer)(connectAuthVisible(React.memo(RegistrationPage)));