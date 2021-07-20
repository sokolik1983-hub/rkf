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
import LightTooltip from "../../../LightTooltip";
import useIsMobile from "../../../../utils/useIsMobile";

const WidgetLogin = forwardRef(
    ({
         isAuthenticated,
         is_active_profile,
         loginUserSuccess,
         logOutUser,
         logo_link,
         login_page,
         footerNav,
         withFilters
     }, ref) => {
        const [open, setOpen] = useState(false);
        const [showModal, setShowModal] = useState(false);

        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const name = ls.get('user_info') ? ls.get('user_info').name : '';
        const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
        const accountType = ls.get('account_type') ? ls.get('account_type') : '';
        const firstName = ls.get('user_info') ? ls.get('user_info').first_name : '';
        const lastName = ls.get('user_info') ? ls.get('user_info').last_name : '';
        const isMobile1080 = useIsMobile(1080);


        const AuthButtons = () => {
            let path = history.location.pathname;
            return (<>
                {path !== '/auth/login' && !login_page && <Link className="login-link" to={LOGIN_URL}>
                    <svg id="Layer_1" className="login-link__icon" width="26" height="26" stroke="#90999e" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="none" strokeMiterlimit="10" strokeWidth="8px" strokeLinecap="round" d="M126.1,147.33l42.09-42.09a7.42,7.42,0,0,0,0-10.48L126.1,52.67" /><line fill="none" strokeMiterlimit="10" strokeLinecap="round" strokeWidth="8px" x1="63.12" y1="100" x2="170.36" y2="100" /><path fill="none" strokeLinejoin="round" strokeLinecap="round" strokeWidth="8px" d="M170.36,68.82V43.68a14,14,0,0,0-14-14H43.68a14,14,0,0,0-14,14V156.32a14,14,0,0,0,14,14H156.32a14,14,0,0,0,14-14V131.18" /></svg>
                    <span>Вход</span>
                </Link>}
                {path !== '/auth/registration' && !login_page && <Link className="registration-link" to={REGISTRATION_URL}>
                    <svg id="Layer_1" className="login-link__icon" width="26" height="26" stroke="#90999e" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="none" strokeMiterlimit="10" strokeWidth="8px" d="M154.74,111.62l10.83,10.83a3.62,3.62,0,0,1,0,5.13L116.1,177.05a3.65,3.65,0,0,1-2.18,1l-12.13,1.29a3.64,3.64,0,0,1-4-4l1.29-12.13a3.6,3.6,0,0,1,1-2.18l49.47-49.47A3.62,3.62,0,0,1,154.74,111.62Z" /><line fill="none" strokeMiterlimit="10" strokeWidth="8px" x1="156.51" y1="136.65" x2="140.54" y2="120.68" /><circle fill="none" strokeMiterlimit="10" strokeWidth="8px" cx="100" cy="55.48" r="31.63" /><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8px" d="M141.35,102.2a39.7,39.7,0,0,0-1.82-4c-8.16-14.85-70.9-14.85-79.06,0s-16.94,70.22-16.94,70.22" /></svg>
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
            <div
                className={`widget-login  ${login_page ? `active` : !isAuthenticated ? `__noAuth` : ''}`}
                style={{ padding: 0}}
                onClick={() => setOpen(!open)}
            >
                {isAuthenticated
                    ? <OutsideClickHandler ref={ref} onOutsideClick={() => setOpen(false)}>
                        <LightTooltip title={!isMobile1080 ? "Аккаунт"  : ''} enterDelay={200} leaveDelay={200}>
                            <div
                                className={`widget-login__wrap ${open ? `_login_open ` : !isAuthenticated ? `__noAuth` : ''}`}>

                                {isMobile1080
                                    ? <div className={`widget-login__user-icon`}>
                                            {footerNav?.image}
                                            <span style={{color: open && '#3366FF', userSelect: "none"  }}>{footerNav?.title}</span>
                                        </div>
                                    : <div className={`widget-login__user-icon${open ? ' _active' : !logo ? ' _no-logo' : ''}`}
                                           style={{ backgroundImage: `url(${logo ? logo : userType === 1 ? DEFAULT_IMG.userAvatar : DEFAULT_IMG.clubAvatar})` }}
                                        />
                                }

                            </div>
                        </LightTooltip>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="widget-login-transition"
                            unmountOnExit
                        >
                            <div className="widget-login__content">
                                <div className="widget-login__userpic-wrap">
                                    <div className={`widget-login__userpic${open ? ' _active' : !logo ? ' _no-logo' : ''}`}
                                        style={{ backgroundImage: `url(${logo ? logo : userType === 1 ? DEFAULT_IMG.userAvatar : DEFAULT_IMG.clubAvatar})` }}
                                    />
                                </div>
                                <div className="widget-login__username">
                                    {userType === 1 &&
                                        <Link to={`/user/${alias}`}>{firstName ? firstName : 'Аноним'}{lastName ? ' ' + lastName : ''}</Link>
                                    }
                                    {(userType === 3 || userType === 5) &&
                                        <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{name}</Link>
                                    }
                                    {userType === 4 &&
                                        <Link to={is_active_profile ? `/kennel/${alias}` : "/kennel/activation"}>{name}</Link>
                                    }
                                </div>

                                <div className="widget-login__button-wrap">
                                    {is_active_profile &&
                                        <>
                                            {userType === 1 &&
                                                <Link className="widget-login__button" to={`/user/${alias}/edit`} >Редактировать профиль</Link>
                                            }
                                            {(userType === 3 || userType === 5) &&
                                                <Link className="widget-login__button" to="/client" >Редактировать профиль</Link>
                                            }
                                            {userType === 4 &&
                                                <Link className="widget-login__button" to={`/kennel/${alias}/edit`} >Редактировать профиль</Link>
                                            }
                                        </>
                                    }
                                </div>

                                <ul className="widget-login__list">
                                    {is_active_profile &&
                                        <>
                                            {userType === 1 &&

                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <Link to={`/user/${alias}/documents`}>Личный кабинет</Link>
                                                </li>
                                            }
                                            {(userType === 3 || userType === 5) &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <Link to={`/${alias}/documents/`}>Личный кабинет</Link>
                                                </li>
                                            }
                                            {userType === 4 &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <Link to={`/kennel/${alias}/documents`}>Личный кабинет</Link>
                                                </li>
                                            }
                                            {accountType === 5 && userType === 5 &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <span onClick={() => setShowModal(true)}>Войти в аккаунт клуба</span>
                                                </li>
                                            }
                                            {accountType === 5 && userType !== 5 &&
                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                    <span onClick={logoutAsUser}>Выйти из аккаунта клуба</span>
                                                </li>
                                            }
                                        </>
                                    }
                                    <li className="widget-login__item widget-login__item--logout" onClick={() => setOpen(false)}>
                                        <Link to="/" onClick={logOutUser}>Выход</Link>
                                    </li>

                                    <li className="widget-login__item widget-login__add-user">
                                        <div>Добавить пользователя</div>
                                    </li>
                                    {!isMobile1080 &&
                                    <>
                                        <li className="widget-login__item" onClick={() => setOpen(false)}>
                                            <a style={{ color: '#3366ff' }} href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/" target="_blank" rel="noopener noreferrer">База знаний</a>
                                        </li>
                                        <li className="widget-login__item">
                                             <Feedback />

                                        </li>
                                    </>
                                    }
                                </ul>
                            </div>
                        </CSSTransition>
                    </OutsideClickHandler>
                    : <AuthButtons />
                }
                <Modal className="widget-login__modal"
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    headerName={"Войти как клуб"}
                >
                    <LoginAsUser history={history} closeModal={() => setShowModal(false)} />
                </Modal>
            </div>
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(WidgetLogin)));