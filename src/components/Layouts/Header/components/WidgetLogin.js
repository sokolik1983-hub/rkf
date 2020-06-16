import React, { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import ls from "local-storage";
import { LOGIN_URL, REGISTRATION_URL, DEFAULT_IMG } from "../../../../appConfig";
import { connectWidgetLogin } from "../../../../pages/Login/connectors";
import history from "utils/history";

const WidgetLogin = forwardRef(
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link }, ref) => {
        const [open, setOpen] = useState(false);
        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const name = ls.get('user_info') ? ls.get('user_info').name : '';
        const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';

        const AuthButtons = () => {
            let path = history.location.pathname;
            return (<>
                {path !== '/auth/login' && <Link className="login-link" to={LOGIN_URL}>Вход</Link>}
                {path !== '/auth/registration' && <Link className="registration-link" to={REGISTRATION_URL}>Регистрация</Link>}
            </>);
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
                                            <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{name}</Link>
                                        }
                                        {userType === 4 &&
                                            <Link to={is_active_profile ? `/nursery/${alias}` : "/nursery/activation"}>{name}</Link>
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
                                                        <Link to={`/nursery/${alias}/edit`}>Редактировать профиль</Link>
                                                    </li>
                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                        <Link to={`/nursery/${alias}/documents`}>Личный кабинет</Link>
                                                    </li>
                                                </>
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
            </div>
        )
    }
);

export default connectWidgetLogin(React.memo(WidgetLogin));
