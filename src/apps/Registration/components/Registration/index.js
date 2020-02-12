import React, { useState } from 'react';
import CommonLayout from "../../../../components/Layout/CommonRegistrationLogin";
import ClubRegistration from "./ClubRegistration";
import './style.scss';


const Registration = () => {
    const [activeTab, setActiveTab] = useState('club');

    return (
        <CommonLayout image={'/static/images/registration/banner.png'}>
            <h1 className="registration__title">Регистрация</h1>
            <div className="registration__tabs">
                <div className={`registration__tab${activeTab === 'club' ? ' _active' : ''}`}
                    onClick={() => setActiveTab('club')}
                >
                    Клубы
                </div>
                <div className={`registration__tab${activeTab === 'nkp' ? ' _active' : ''}`}
                    onClick={() => null} //setActiveTab('nkp')
                >
                    НКП
                </div>
                <div className={`registration__tab${activeTab === 'kennel' ? ' _active' : ''}`}
                    onClick={() => null} //setActiveTab('kennel')
                >
                    Питомники
                </div>
                <div className={`registration__tab${activeTab === 'owner' ? ' _active' : ''}`}
                    onClick={() => null} //setActiveTab('owner')
                >
                    Владельцы
                </div>

            </div>
            {activeTab === 'club' &&
                <ClubRegistration />
            }
        </CommonLayout>
    );
};

export default React.memo(Registration);