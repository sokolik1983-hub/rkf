import React, { useState } from "react";
import {NavLink, Redirect} from "react-router-dom";
import { compose } from "redux";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Card from "../../components/Card";
import HorizontalSwipe from "../../components/HorozintalSwipe";
import ClubRegistration from "./components/ClubRegistration";
import NurseryRegistration from "./components/NurseryRegistration";
import IndividualRegistration from "./components/IndividualRegistration";
import reducer from "../Login/reducer";
import injectReducer from "../../utils/injectReducer";
import { connectAuthVisible } from "../Login/connectors";
import {LOGIN_URL, REGISTRATION_URL} from "../../appConfig";
import "./index.scss";


const RegistrationPage = ({ isAuthenticated, history }) => {
    const [activeTab, setActiveTab] = useState('individual');

    return isAuthenticated ?
        <Redirect to={'/'} /> :
        <Layout login_page>
            <AuthLayout className="registration-page">
                <Card>
                    <div className="registration-page__main-tabs">
                        <NavLink exac="true" to={LOGIN_URL} className="registration-page__main-tab">Вход</NavLink>
                        <NavLink exac="true" to={REGISTRATION_URL} className="registration-page__main-tab">Регистрация</NavLink>
                    </div>
                    <div className="registration-page__tabs">
                        <div className="registration-page__tabs-controls">
                            <HorizontalSwipe id="registration-page__tabs-controls">
                                <ul className="registration-page__tabs-list">
                                    <li className={`registration-page__tab ${activeTab === 'individual' ? ' _active' : ''}`}
                                         onClick={() => setActiveTab('individual')}
                                    >
                                        Физическое лицо
                                    </li>
                                    <li className={`registration-page__tab${activeTab === 'nursery' ? ' _active' : ''}`}
                                         onClick={() => setActiveTab('nursery')}
                                    >
                                        Питомник
                                    </li>
                                    <li className={`registration-page__tab${activeTab === 'club' ? ' _active' : ''}`}
                                         onClick={() => setActiveTab('club')}
                                    >
                                        Клуб
                                    </li>
                                    <li className={`registration-page__tab _disabled`}
                                         onClick={() => null}
                                    >
                                        НКП
                                    </li>
                                </ul>
                            </HorizontalSwipe>
                        </div>
                        {activeTab === 'individual' && <IndividualRegistration history={history} />}
                        {activeTab === 'nursery' && <NurseryRegistration />}
                        {activeTab === 'club' && <ClubRegistration />}
                    </div>
                </Card>
            </AuthLayout>
        </Layout>
};

const withReducer = injectReducer({ key: 'authentication', reducer: reducer });

export default compose(withReducer)(connectAuthVisible(React.memo(RegistrationPage)));