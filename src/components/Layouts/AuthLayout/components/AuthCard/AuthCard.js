import React, {memo, useState} from "react";
import ScrollArea from "react-scrollbar";
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
                <ScrollArea
                    className="auth-card__form"
                    contentClassName="auth-card__scroll"
                    verticalScrollbarStyle={{borderRadius: 6, width: 6, backgroundColor: '#aaa'}}
                    verticalContainerStyle={{borderRadius: 8, width: 8}}
                    horizontal={false}
                    smoothScrolling={true}
                >
                    {activeTab === 1 && <LoginForm/>}
                    {activeTab === 2 && <RegistrationForm/>}
                </ScrollArea>
            </div>
            <CopyrightInfo withSocials={true} />
        </div>
    );
};

export default memo(AuthCard);