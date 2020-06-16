import React, { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import ls from "local-storage";
import Modal from "../../../Modal";
import LoginAsUser from "./LoginAsUser";
import { LOGIN_URL, REGISTRATION_URL, DEFAULT_IMG } from "../../../../appConfig";
import {connectLogin, connectWidgetLogin} from "../../../../pages/Login/connectors";
import history from "../../../../utils/history";
import {Request} from "../../../../utils/request";


const WidgetLogin = forwardRef(
    ({ isAuthenticated, is_active_profile, loginUserSuccess, logOutUser, logo_link }, ref) => {
        const [open, setOpen] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const name = ls.get('user_info') ? ls.get('user_info').name : '';
        const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
        const accountType = ls.get('account_type') ? ls.get('account_type') : '';

        const AuthButtons = () => {
            let path = history.location.pathname;
            return (<>
                {path !== '/auth/login' && <Link className="login-link" to={LOGIN_URL}>Вход</Link>}
                {path !== '/auth/registration' && <Link className="registration-link" to={REGISTRATION_URL}>Регистрация</Link>}
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
                        <div className={`widget-login__user-icon${open ? ' _active' : ''}`}
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
                                            <>
                                                <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{name}</Link>
                                                {is_active_profile && <Link className="widget-login__edit" to="/client" />}
                                            </>
                                        }
                                        {userType === 4 &&
                                            <>
                                                <Link to={is_active_profile ? `/nursery/${alias}` : "/nursery/activation"}>{name}</Link>
                                                {is_active_profile && <Link className="widget-login__edit" to={`/nursery/${alias}/edit`} />}
                                            </>
                                        }
                                    </li>
                                    {is_active_profile &&
                                        <>
                                            {(userType === 3 || userType === 5) &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <Link to={`/${alias}/documents/`}>Личный кабинет</Link>
                                                </li>
                                            }
                                            {userType === 4 &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <Link to={`/nursery/${alias}/documents`}>Личный кабинет</Link>
                                                </li>
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
