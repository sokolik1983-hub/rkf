import React, { useState } from "react";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import ClubRegistration from "./components/ClubRegistration";
import IndividualRegistration from "./components/IndividualRegistration";
import "./index.scss";


const RegistrationPage = () => {
    const [activeTab, setActiveTab] = useState('individual');

    return (
        <Layout>
            <AuthLayout className="registration-page">
                <h1 className="registration-page__title">Регистрация</h1>
                <div className="registration-page__tabs">
                    <div className="registration-page__tabs-controls">
                        <div className={`registration-page__tab${activeTab === 'club' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('club')}
                        >
                            Клуб
                        </div>
                        <div className={`registration-page__tab${activeTab === 'individual' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('individual')}
                        >
                            Физическое лицо
                            </div>
                    </div>
                    {activeTab === 'club' && <ClubRegistration />}
                    {activeTab === 'individual' && <IndividualRegistration />}
                </div>
            </AuthLayout>
        </Layout>
    )
};

export default React.memo(RegistrationPage);