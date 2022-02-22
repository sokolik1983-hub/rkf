import React, {memo, useState} from "react";
import CopyrightInfo from "../../../../CopyrightInfo";
import LoginForm from "../LoginForm";
import RegistrationForm from "../RegistrationForm";
import "./index.scss";


const AuthCard = () => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className="auth-card">
            <div className="auth-card__content">
                <div className="auth-card__nav">
                    <span
                        className={`auth-card__nav-item${activeTab === 1 ? ' _active' : ''}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Вход
                    </span>
                    <span
                        className={`auth-card__nav-item${activeTab === 2 ? ' _active' : ''}`}
                        onClick={() => setActiveTab(2)}
                    >
                        Регистрация
                    </span>
                </div>
                <div className="auth-card__form">
                    {activeTab === 1 && <LoginForm/>}
                    {activeTab === 2 && <RegistrationForm/>}
                </div>
            </div>
            <CopyrightInfo withSocials={true} />
        </div>
    );
};

export default memo(AuthCard);