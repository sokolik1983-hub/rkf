import React, { useState } from "react";
import ClubRegistration from "./components/ClubRegistration";
import Card from "components/Card";
//import IndividualRegistration from "./components/IndividualRegistration";
import "./index.scss";


const RegistrationPage = () => {
    const [activeTab, setActiveTab] = useState('club');

    return (
        <Card>
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
        </Card>
    )
};

export default React.memo(RegistrationPage);