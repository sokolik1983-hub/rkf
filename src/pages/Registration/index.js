import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/Layouts/AuthLayout";
import ClubRegistration from "./components/ClubRegistration";
import { LOGIN_URL } from "appConfig";
//import IndividualRegistration from "./components/IndividualRegistration";
import "./index.scss";


const RegistrationPage = () => {
    const [activeTab, setActiveTab] = useState('club');

    return (
        <Layout>
            <AuthLayout className="registration-page">
                <div className="registration-page__login">Уже есть аккаунт? Воспользуйтесь формой <Link className="registration-page__login-link" to={LOGIN_URL}>ВХОДА</Link></div>
                <h1 className="registration-page__title">Регистрация</h1>
                <div className="registration-page__support-links">
                    <p>
                        <a href="https://help.rkf.online/ru/knowledge_base/article/36/category/3/#/" target="_blank" rel="noopener noreferrer">Инструкция по регистрации клуба на портале RKF.Online</a>
                    </p>
                    <p>
                        <a href="https://help.rkf.online/ru/knowledge_base/art/52/cat/3/#/" target="_blank" rel="noopener noreferrer">Видео-инструкция по регистрации клуба на портале RKF.Online</a>
                    </p>
                </div>
                <div className="registration-page__tabs">
                    <div className="registration-page__tabs-controls">
                        <div className={`registration-page__tab${activeTab === 'club' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('club')}
                        >
                            Клуб
                        </div>
                        <div className={`registration-page__tab${activeTab === 'kennel' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('kennel')}
                        >
                            Питомник
                        </div>
                    </div>
                    {activeTab === 'club' && <ClubRegistration />}
                    {activeTab === 'kennel' && <KennelRegistration history={history} />}
                </div>
            </AuthLayout>
        </Layout>
    )
};

export default React.memo(RegistrationPage);