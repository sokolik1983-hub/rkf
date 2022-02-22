import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import HorizontalSwipe from "../../../../HorozintalSwipe";
import ClubRegistration from "./components/ClubRegistration";
import NurseryRegistration from "./components/NurseryRegistration";
import IndividualRegistration from "./components/IndividualRegistration";
import "./index.scss";


const RegistrationForm = () => {
    const [activeTab, setActiveTab] = useState('individual');
    const history = useHistory();

    return (
        <div className="registration-form">
            <div className="registration-form__controls">
                <HorizontalSwipe id="registration-form__controls">
                    <ul className="registration-form__tabs">
                        <li className={`registration-form__tab ${activeTab === 'individual' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('individual')}
                        >
                            Физическое лицо
                        </li>
                        <li className={`registration-form__tab${activeTab === 'nursery' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('nursery')}
                        >
                            Питомник
                        </li>
                        <li className={`registration-form__tab${activeTab === 'club' ? ' _active' : ''}`}
                            onClick={() => setActiveTab('club')}
                        >
                            Клуб
                        </li>
                        <li className={`registration-form__tab _disabled`}
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
    )
};

export default memo(RegistrationForm);