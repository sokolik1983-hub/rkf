import React, { forwardRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ls from "local-storage";
import { LOGIN_URL, REGISTRATION_URL, DEFAULT_IMG } from "appConfig";
import { connectLogin, connectWidgetLogin } from "pages/Login/connectors";
import OutsideClickHandler from "react-outside-click-handler";
import history from "utils/history";
import { Request, getHeaders } from "utils/request";
import Feedback from "components/Feedback";
import LightTooltip from "components/LightTooltip";
import NotificationCategories from "./NotificationCategories";
import NotificationItem from "./NotificationItem";
import { isDevEnv } from 'utils';
import * as signalR from "@microsoft/signalr";
import "./styles.scss";


const Notifications = forwardRef(
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link }, ref) => {
        const [open, setOpen] = useState(false);
        const [controlsOpen, setControlsOpen] = useState(false);
        const [notifications, setNotifications] = useState([1, 2, 3, 4, 5]);
        const [showDot, setShowDot] = useState(null);
        const [category, setCategory] = useState(null);

        const hubUrl = isDevEnv()
            ? 'http://dev.uep24.ru/api/hubs/user_hub'
            : 'https://rkf.online/api/hubs/user_hub';

        useEffect(() => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl,
                    {
                        skipNegotiation: true,
                        transport: signalR.HttpTransportType.WebSockets,
                        accessTokenFactory: () => getHeaders().Authorization.substring(7)
                    }
                )
                .withAutomaticReconnect()
                .build();

            connection.on("sendToUser", (articleHeading, articleContent) => {
                console.log(articleHeading);
                console.log(articleContent);
            });

            connection.start()
                .catch(() => console.log('Error while establishing connection :('))
                .then(function () {
                    connection.invoke('GetConnectionId').then(function (connectionId) {
                        console.log(`connectionId ${connectionId}`)
                    })
                })
        }, []);

        // const [showModal, setShowModal] = useState(false);

        // const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        // const name = ls.get('user_info') ? ls.get('user_info').name : '';
        // const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        // const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
        // const accountType = ls.get('account_type') ? ls.get('account_type') : '';
        // const personalAccess = ls.get('personal_office_access') ? ls.get('personal_office_access') : false;
        // const firstName = ls.get('user_info') ? ls.get('user_info').first_name : '';
        // const lastName = ls.get('user_info') ? ls.get('user_info').last_name : '';


        return (
            <div className="Notifications">
                {isAuthenticated
                    && <>
                        <LightTooltip title="Уведомления" enterDelay={200} leaveDelay={200}>
                            <div className={`Notifications__icon${showDot ? ' with-dot' : ''}`} onClick={() => setOpen(!open)} />
                        </LightTooltip>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="Notifications-transition"
                            unmountOnExit
                        >
                            <div className="Notifications__content">
                                <OutsideClickHandler ref={ref} onOutsideClick={() => setControlsOpen(false)}>
                                    <div className="Notifications__controls">
                                        <h4 onClick={() => setControlsOpen(!controlsOpen)}>Уведомления</h4>
                                        <button
                                            onClick={() => setControlsOpen(!controlsOpen)}
                                            className={`Notifications__controls-arrow ${controlsOpen ? `_widget_open` : ``}`}
                                        />
                                    </div>
                                    <CSSTransition
                                        in={controlsOpen}
                                        timeout={350}
                                        classNames="Notifications-transition"
                                        unmountOnExit
                                    >
                                        <div className="Notifications__controls-inner">
                                            <NotificationCategories setCategory={setCategory} />
                                        </div>
                                    </CSSTransition>
                                </OutsideClickHandler>
                                <div className="Notifications__list">
                                    {/* <li className="Notifications__item Notifications__item--logout" onClick={() => setOpen(false)}>
                                        <Link to="/" onClick={logOutUser}>Выход</Link>
                                    </li> */}
                                    {
                                        notifications.map((n, key) => {
                                            return <NotificationItem key={key} {...n} />
                                        })
                                    }
                                    <div className="Notifications__list-see-all">
                                        <Link to={'#'} >Посмотреть все</Link>
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    </>
                }
            </div>
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(Notifications)));