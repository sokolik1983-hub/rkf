import React, {useState} from "react";
import Layout from "../../components/Layouts";
import AuthLayout from "../../components/Layouts/AuthLayout";
import ClubRegistration from "./components/ClubRegistration";
import "./index.scss";


const RegistrationPage = () => {
    const [activeTab, setActiveTab] = useState('club');

    return (
        <Layout>
            <AuthLayout className="registration-page">
                <h1 className="registration-page__title">Регистрация</h1>
                <div className="registration-page__tabs">
                    <div className="registration-page__tabs-controls">
                        <div className={`registration-page__tab${activeTab === 'club' ? ' _active' : ''}`}
                             onClick={() => setActiveTab('club')}
                        >
                            Клубы
                        </div>
                        <div className={`registration-page__tab${activeTab === 'nkp' ? ' _active' : ''}`}
                             onClick={() => null} //setActiveTab('nkp')
                        >
                            НКП
                        </div>
                        <div className={`registration-page__tab${activeTab === 'kennel' ? ' _active' : ''}`}
                             onClick={() => null} //setActiveTab('kennel')
                        >
                            Питомники
                        </div>
                        <div className={`registration-page__tab${activeTab === 'owner' ? ' _active' : ''}`}
                             onClick={() => null} //setActiveTab('owner')
                        >
                            Владельцы
                        </div>
                    </div>
                    {activeTab === 'club' && <ClubRegistration/>}
                </div>
            </AuthLayout>
        </Layout>
    )
};

export default React.memo(RegistrationPage);