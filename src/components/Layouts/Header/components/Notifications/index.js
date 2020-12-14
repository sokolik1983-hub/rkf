import React, { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ls from "local-storage";
import { LOGIN_URL, REGISTRATION_URL, DEFAULT_IMG } from "appConfig";
import { connectLogin, connectWidgetLogin } from "pages/Login/connectors";
import history from "utils/history";
import { Request } from "utils/request";
import Feedback from "components/Feedback";
import LightTooltip from "components/LightTooltip";
import "./styles.scss";


const Notifications = forwardRef(
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link }, ref) => {
        const [open, setOpen] = useState(false);
        const [showModal, setShowModal] = useState(false);

        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const name = ls.get('user_info') ? ls.get('user_info').name : '';
        const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
        const accountType = ls.get('account_type') ? ls.get('account_type') : '';
        const personalAccess = ls.get('personal_office_access') ? ls.get('personal_office_access') : false;
        const firstName = ls.get('user_info') ? ls.get('user_info').first_name : '';
        const lastName = ls.get('user_info') ? ls.get('user_info').last_name : '';


        return (
            <div className="Notifications">
                {isAuthenticated
                    && <>
                        <LightTooltip title="Уведомления" enterDelay={200} leaveDelay={200}>
                            <div className="Notifications__icon" onClick={() => setOpen(!open)} />
                        </LightTooltip>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="Notifications-transition"
                            unmountOnExit
                        >
                            <div className="Notifications__content">
                                <ul className="Notifications__list">
                                    <li className="Notifications__item Notifications__item--logout" onClick={() => setOpen(false)}>
                                        <Link to="/" onClick={logOutUser}>Выход</Link>
                                    </li>
                                    <li className="Notifications__item" onClick={() => setOpen(false)}>
                                        <a style={{ color: '#3366ff' }} href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/" target="_blank" rel="noopener noreferrer">База знаний</a>
                                    </li>
                                    <li className="Notifications__item">
                                        <Feedback />
                                    </li>
                                </ul>
                            </div>
                        </CSSTransition>
                    </>
                }
            </div>
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(Notifications)));