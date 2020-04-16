import React, { useState } from "react";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import ClubRegistration from "./components/ClubRegistration";
//import IndividualRegistration from "./components/IndividualRegistration";
import "./index.scss";


const RegistrationPage = () => {
    const [activeTab, setActiveTab] = useState('club');

    return (
        <Layout>
            <AuthLayout className="registration-page">
                <h1 className="registration-page__title">Регистрация</h1>
                <div className="registration-page__support-links">
                    <p>
                        <a href="http://support.rkf.online/%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE-%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8-%D0%BA%D0%BB%D1%83%D0%B1%D0%B0-%D0%BD%D0%B0-%D0%BF%D0%BE/" target="_blank" rel="noopener noreferrer">Инструкция по регистрации клуба на портале RKF.Online</a>
                    </p>
                    <p>
                        <a href="http://support.rkf.online/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be-%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d1%80%d0%b5%d0%b3%d0%b8%d1%81%d1%82%d1%80%d0%b0%d1%86%d0%b8%d0%b8-%d0%bd%d0%b0-%d0%bf%d0%be/" target="_blank" rel="noopener noreferrer">Видео-инструкция по регистрации клуба на портале RKF.Online</a>
                    </p>
                </div>
                <div className="registration-page__tabs">
                    <div className="registration-page__tabs-controls">
                        <div className={`registration-page__tab${activeTab === 'club' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('club')}
                        >
                            Клуб
                        </div>
                        <div className={`registration-page__tab${activeTab === 'individual' ? ' _active' : ''}`}
                            //onClick={() => setActiveTab('individual')}
                            onClick={() => null}
                        >
                            Физическое лицо
                            </div>
                    </div>
                    {activeTab === 'club' && <ClubRegistration />}
                    {/* {activeTab === 'individual' && <IndividualRegistration />} */}
                </div>
            </AuthLayout>
        </Layout>
    )
};

export default React.memo(RegistrationPage);