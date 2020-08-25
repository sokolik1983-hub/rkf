import React, { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import ls from "local-storage";
import Modal from "../../../Modal";
import LoginAsUser from "./LoginAsUser";
import { LOGIN_URL, REGISTRATION_URL, DEFAULT_IMG } from "../../../../appConfig";
import { connectLogin, connectWidgetLogin } from "../../../../pages/Login/connectors";
import history from "../../../../utils/history";
import { Request } from "../../../../utils/request";
import Feedback from "../../../Feedback";


const WidgetLogin = forwardRef(
    ({ isAuthenticated, is_active_profile, loginUserSuccess, logOutUser, logo_link }, ref) => {
        const [open, setOpen] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const name = ls.get('user_info') ? ls.get('user_info').name : '';
        const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
        const accountType = ls.get('account_type') ? ls.get('account_type') : '';
        const personalAccess = ls.get('personal_office_access') ? ls.get('personal_office_access') : false;

        const AuthButtons = () => {
            let path = history.location.pathname;
            return (<>
                {path !== '/auth/login' && <Link className="login-link" to={LOGIN_URL}>
                    <svg className="login-link__icon" id="Layer_1" fill="#90999e" width="26" height="26" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M178.91,104H48.59a4,4,0,0,1,0-8H178.91a4,4,0,0,1,0,8Z"/><path d="M176.5,128.14v41.12a7.25,7.25,0,0,1-7.24,7.24H30.74a7.25,7.25,0,0,1-7.24-7.24V30.74a7.25,7.25,0,0,1,7.24-7.24H169.26a7.25,7.25,0,0,1,7.24,7.24V71.86l8,8V30.74A15.25,15.25,0,0,0,169.26,15.5H30.74A15.25,15.25,0,0,0,15.5,30.74V169.26A15.26,15.26,0,0,0,30.74,184.5H169.26a15.26,15.26,0,0,0,15.24-15.24V120.14Z"/><path d="M114.4,170.1a4,4,0,0,1-2.83-6.83L174.84,100,111.57,36.73a4,4,0,0,1,5.66-5.66l63.39,63.39a7.85,7.85,0,0,1,0,11.08l-63.39,63.39A4,4,0,0,1,114.4,170.1Z"/></svg>
                    <span>Вход</span>
                </Link>}
                {path !== '/auth/registration' && <Link className="registration-link" to={REGISTRATION_URL}>
                    <svg id="Layer_1" className="registration-link__icon" fill="#90999e" width="27" height="27" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><polygon points="160.16 95.44 178.94 114.22 116.67 176.49 95.65 178.72 97.89 157.71 160.16 95.44"/><line x1="165.26" y1="127.9" x2="146.48" y2="109.12"/><circle cx="93.65" cy="50.68" r="32.95"/><path d="M109.27,89.61c5.66,1.08,11.12,2.25,15.73,4.75,4.06,2.2,6.62,5.87,8.06,11.56.21.83.4,1.67.59,2.5l6.73-6.72c-2.16-6.77-5.92-11.57-11.47-14.57s-11.78-4.39-18.1-5.6a116.73,116.73,0,0,0-17-2h-.34a116.57,116.57,0,0,0-17,2c-6.32,1.21-12.46,2.55-18.1,5.6-6.14,3.32-10.1,8.81-12.12,16.77-1.58,6.23-2.68,12.59-3.74,18.73-.5,2.9-1,5.89-1.57,8.8-1.6,8.38-3.27,17.32-5.09,27.34-.62,3.41-.39,2.11-1,5.53l7.24,6.15Q43,165.33,44,160.24c1.81-10,3.47-18.91,5.07-27.26.57-3,1.09-6,1.6-8.95,1-6,2.1-12.19,3.6-18.11,1.45-5.69,4-9.36,8.07-11.56,4.61-2.5,10.07-3.67,15.73-4.75a107.55,107.55,0,0,1,15.62-1.86A107.55,107.55,0,0,1,109.27,89.61Z"/></svg>
                    <span>Регистрация</span>
                </Link>}
            </>);
        };

        const logoutAsUser = async () => {
            await Request({
                url: '/api/administration/authentication/logout',
                method: 'POST'
            }, data => {
                loginUserSuccess(data);
                history.replace('/');
            }, error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
            });
        };

        return (
            <div className="widget-login">
                {isAuthenticated
                    ? <OutsideClickHandler ref={ref} onOutsideClick={() => setOpen(false)}>
                        <div className={`widget-login__user-icon${open ? ' _active' : !logo ? ' _no-logo' : ''}`}
                            style={{ backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})` }}
                            onClick={() => setOpen(!open)}
                        />
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="widget-login-transition"
                            unmountOnExit
                        >
                            <div className="widget-login__content">
                                <ul className="widget-login__list">
                                    <li className="widget-login__item">
                                        {(userType === 3 || userType === 5) &&
                                            <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{name}</Link>
                                        }
                                        {userType === 4 &&
                                            <Link to={is_active_profile ? `/kennel/${alias}` : "/kennel/activation"}>{name}</Link>
                                        }
                                    </li>
                                    {is_active_profile &&
                                        <>
                                            {(userType === 3 || userType === 5) &&
                                                <>
                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                        <Link to="/client">Редактировать профиль</Link>
                                                    </li>
                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                        <Link to={`/${alias}/documents/`}>Личный кабинет</Link>
                                                    </li>
                                                </>
                                            }
                                            {userType === 4 &&
                                                <>
                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                        <Link to={`/kennel/${alias}/edit`}>Редактировать профиль</Link>
                                                    </li>
                                                    {personalAccess &&
                                                        <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                            <Link to={`/kennel/${alias}/documents`}>Личный кабинет</Link>
                                                        </li>
                                                    }
                                                </>
                                            }
                                            {accountType === 5 && userType === 5 &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <span onClick={() => setShowModal(true)}>Войти как клуб</span>
                                                </li>
                                            }
                                            {accountType === 5 && userType !== 5 &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <span onClick={logoutAsUser}>Выйти из клуба</span>
                                                </li>
                                            }
                                        </>
                                    }
                                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                                        <Link to="/" onClick={logOutUser}>Выход</Link>
                                    </li>
                                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                                        <a style={{ color: '#3366ff', backgroundColor: 'whitesmoke' }} href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/" target="_blank" rel="noopener noreferrer">База знаний</a>
                                    </li>
                                    <li className="widget-login__item">
                                        <Feedback />
                                    </li>
                                </ul>
                            </div>
                        </CSSTransition>
                    </OutsideClickHandler>
                    : <AuthButtons />
                }
                <Modal className="widget-login__modal"
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                >
                    <LoginAsUser history={history} closeModal={() => setShowModal(false)} />
                </Modal>
            </div>
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(WidgetLogin)));