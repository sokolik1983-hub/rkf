import React, {forwardRef, useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import ls from 'local-storage';
import Modal from '../../../Modal';
import LoginAsUser from './LoginAsUser';
import { LOGIN_URL, REGISTRATION_URL, DEFAULT_IMG, widgetLoginIcon } from '../../../../appConfig';
import { connectLogin, connectWidgetLogin } from '../../../../pages/Login/connectors';
import history from '../../../../utils/history';
import { Request } from '../../../../utils/request';
import useIsMobile from '../../../../utils/useIsMobile';
import PopupModal from '../../../PopupModal';
import OutsideClickHandler from 'react-outside-click-handler';
import {endpointGetClubInfo} from '../../ClubLayout/config';
import {endpointGetUserInfo} from '../../UserLayout/config';

const WidgetLogin = forwardRef(
    ({
         isAuthenticated,
         is_active_profile,
         loginUserSuccess,
         logOutUser,
         logo_link,
         login_page,
         footerNav,
         withFilters,
         setOpen,
         open
     }, ref) => {

        const [showModal, setShowModal] = useState(false);
        const [desktop, setDesktop] = useState(false);
        const [menuBackground, setMenuBackground] = useState(null);

        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const name = ls.get('user_info') ? ls.get('user_info').name : '';
        const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
        const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
        const accountType = ls.get('account_type') ? ls.get('account_type') : '';
        const firstName = ls.get('user_info') ? ls.get('user_info').first_name : '';
        const lastName = ls.get('user_info') ? ls.get('user_info').last_name : '';
        const isMobile1080 = useIsMobile(1080);

        const widgetLoginRef = useRef();

        const AuthButtons = () => {
            let path = history.location.pathname;
            return (<>
                {!login_page && <Link className="login-link padding-for-header-title" to={LOGIN_URL}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 3.02755C0 1.3428 1.36578 0 3.02755 0H20.9566C22.6414 0 23.9842 1.36578 23.9842 3.02755V5.00561C23.9842 5.43666 23.6347 5.7861 23.2037 5.7861C22.7726 5.7861 22.4232 5.43666 22.4232 5.00561V3.02755C22.4232 2.22072 21.7721 1.56098 20.9566 1.56098H3.02755C2.22072 1.56098 1.56098 2.21205 1.56098 3.02755V20.9724C1.56098 21.7793 2.21205 22.439 3.02755 22.439H20.9724C21.7793 22.439 22.439 21.7879 22.439 20.9724V18.9944C22.439 18.5633 22.7885 18.2139 23.2195 18.2139C23.6506 18.2139 24 18.5633 24 18.9944V20.9724C24 22.6572 22.6342 24 20.9724 24H3.02755C1.3428 24 0 22.6342 0 20.9724V3.02755Z" fill="#8F989D"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.4436 11.9997C5.4436 11.5687 5.79304 11.2192 6.22409 11.2192H21.6212C22.0523 11.2192 22.4017 11.5687 22.4017 11.9997C22.4017 12.4308 22.0523 12.7802 21.6212 12.7802H6.22409C5.79304 12.7802 5.4436 12.4308 5.4436 11.9997Z" fill="#8F989D"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7269 4.10555C14.0317 3.80075 14.5259 3.80075 14.8307 4.10555L22.7251 12L14.8307 19.8944C14.5259 20.1992 14.0317 20.1992 13.7269 19.8944C13.4221 19.5896 13.4221 19.0954 13.7269 18.7906L20.5175 12L13.7269 5.20933C13.4221 4.90453 13.4221 4.41035 13.7269 4.10555Z" fill="#8F989D"/>
                </svg>

                    <span>Вход</span>
                </Link>}
                {!login_page && <Link className="registration-link" to={REGISTRATION_URL}>
                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.53511 24.9999C9.38338 24.9999 9.23166 24.9765 9.0916 24.9299C8.90486 24.8715 8.72979 24.7548 8.58973 24.6147C8.44968 24.4747 8.34463 24.3113 8.27461 24.1245C8.21625 23.9495 8.19291 23.7627 8.20458 23.5526L8.40299 21.7086C8.438 21.3934 8.56639 21.1367 8.77647 20.9266L16.2695 13.4569C16.5262 13.2002 16.8414 13.0718 17.2032 13.0718C17.565 13.0718 17.9035 13.2118 18.1602 13.4686L19.7942 15.1026C20.051 15.3594 20.1794 15.6745 20.1794 16.0363C20.1794 16.3981 20.051 16.7132 19.7942 16.97L12.3012 24.4397C12.0795 24.6614 11.7993 24.7898 11.5076 24.8131L9.67517 24.9999C9.65182 24.9999 9.5818 24.9999 9.53511 24.9999ZM9.87358 22.0237L9.75686 23.5059L11.3325 23.2842L16.1177 18.4523L14.7522 17.0984L9.87358 22.0237ZM17.2148 17.3552L18.5804 15.9896L17.1682 14.6591L15.8493 15.9896L17.2148 17.3552Z" fill="#90999E"/>
                        <path d="M0.629835 23.3427C0.454765 23.3193 0.268024 23.2026 0.151311 23.0392C0.0229258 22.8758 -0.0237595 22.6657 0.0112545 22.4673C0.0229258 22.3856 1.35346 13.9823 2.66065 11.6247C3.19753 10.6443 4.62143 10.1424 5.84692 9.87395C5.68352 9.74557 5.52012 9.60551 5.38007 9.46545C5.1233 9.19701 4.88987 8.9169 4.69146 8.62512C4.50472 8.32166 4.32965 7.99486 4.18959 7.6564C4.04954 7.34127 3.94449 6.97946 3.87447 6.61765C3.80444 6.24416 3.76942 5.89402 3.76942 5.53221C3.76942 5.18207 3.80444 4.82026 3.87447 4.44678C3.95617 4.08497 4.04954 3.7465 4.18959 3.4197C4.32965 3.08123 4.50472 2.75444 4.69146 2.45098C4.8782 2.1592 5.11163 1.87909 5.38007 1.61064C5.64851 1.3422 5.92862 1.10878 6.2204 0.922036C6.57054 0.70028 6.88567 0.536881 7.2008 0.420168C7.52759 0.280112 7.87773 0.17507 8.23954 0.105042C8.58969 0.035014 8.9515 0 9.31331 0C9.67512 0 10.0369 0.035014 10.3987 0.105042C10.7606 0.186741 11.1107 0.291783 11.4375 0.420168C11.7993 0.571895 12.1261 0.746966 12.4062 0.933707C12.698 1.12045 12.9781 1.35387 13.2465 1.62232C13.515 1.89076 13.7484 2.17087 13.9352 2.46265C14.1569 2.80112 14.3203 3.11625 14.4487 3.43137C14.5888 3.75817 14.6938 4.10831 14.7638 4.47012C14.8338 4.79692 14.8689 5.14706 14.8689 5.55556C14.8689 5.9057 14.8338 6.25584 14.7638 6.64099C14.6821 7.0028 14.5771 7.35294 14.4487 7.67974C14.3086 8.00654 14.1336 8.33333 13.9352 8.63679C13.7367 8.92857 13.515 9.20868 13.2465 9.47712C13.1065 9.61718 12.9548 9.75724 12.7797 9.88562C14.0169 10.1424 15.4408 10.6559 15.9776 11.6363C16.106 11.8697 16.1994 12.1032 16.2928 12.3366C16.3628 12.535 16.3628 12.7334 16.2811 12.9202C16.1994 13.1069 16.0477 13.247 15.8493 13.3287C15.7676 13.3637 15.6742 13.3754 15.5808 13.3754C15.2657 13.3754 14.9739 13.1769 14.8572 12.8852C14.7872 12.7101 14.7055 12.535 14.6121 12.3599C14.5304 12.1965 14.3553 12.0915 14.2036 11.9981C13.9352 11.8464 13.655 11.7297 13.3633 11.6363C12.9548 11.4963 12.5229 11.4029 12.1028 11.3212C11.5659 11.2045 11.0057 11.1461 10.4454 11.1111C9.75682 11.0644 9.05654 11.0644 8.36793 11.1111C7.76102 11.1345 7.15411 11.1928 6.55887 11.2979C6.10369 11.3796 5.66018 11.4846 5.21667 11.6363C4.92489 11.7414 4.62143 11.8581 4.35299 12.0331C4.22461 12.1148 4.07288 12.2199 4.00285 12.3599C2.84739 14.4374 1.5402 22.6307 1.52853 22.7007C1.4585 23.0859 1.1317 23.3543 0.75822 23.3543L0.629835 23.3427ZM9.32498 1.54062C9.05654 1.54062 8.79977 1.56396 8.543 1.62232C8.28623 1.669 8.02946 1.7507 7.78436 1.84407C7.55094 1.93744 7.30584 2.0775 7.08408 2.21755C6.89734 2.34594 6.69893 2.50934 6.48884 2.71942C6.3021 2.90616 6.12703 3.10458 5.97531 3.32633C5.87026 3.5014 5.71854 3.7465 5.61349 4.01494C5.52012 4.26004 5.43843 4.50514 5.38007 4.7619C5.33338 5.01867 5.29837 5.27544 5.29837 5.54388C5.29837 5.81233 5.32171 6.06909 5.38007 6.32586C5.43843 6.58263 5.50845 6.8394 5.61349 7.07283C5.71854 7.31793 5.83525 7.55135 5.98698 7.77311C6.12703 7.98319 6.3021 8.19328 6.48884 8.38002C6.67559 8.56676 6.874 8.73016 7.09575 8.88189C7.31751 9.03361 7.55094 9.15033 7.78436 9.2437C8.02946 9.33707 8.28623 9.41877 8.543 9.47712C8.75308 9.51214 8.97484 9.53548 9.18492 9.53548H9.40668C9.68679 9.52381 9.89688 9.51214 10.107 9.47712C10.3754 9.41877 10.6322 9.33707 10.8773 9.2437C11.0874 9.162 11.2974 9.04529 11.5775 8.87022C11.776 8.74183 11.9744 8.57843 12.1845 8.36835C12.3712 8.18161 12.5346 7.98319 12.6863 7.76144C12.8381 7.53968 12.9548 7.31793 13.0481 7.07283C13.1415 6.86275 13.2115 6.61765 13.2816 6.32586C13.3282 6.06909 13.3633 5.81233 13.3633 5.54388C13.3633 5.27544 13.3399 5.01867 13.2816 4.7619C13.2232 4.45845 13.1415 4.22502 13.0481 4.01494C12.9664 3.79318 12.8497 3.5831 12.6747 3.31466C12.5229 3.0929 12.3595 2.89449 12.1728 2.70775C11.986 2.52101 11.7876 2.35761 11.5659 2.20588C11.3441 2.06583 11.1224 1.94911 10.8773 1.84407C10.6205 1.7507 10.3754 1.669 10.1186 1.62232C9.85019 1.56396 9.58175 1.54062 9.32498 1.54062Z" fill="#90999E"/>
                    </svg>

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

        const handleChecked = () => {
            setDesktop(!desktop)
        };

        const handleOutsideClick = (e) => {
            !widgetLoginRef.current?.contains(e.target) && setDesktop(false)
        }
        useEffect(() => {
            setOpen(desktop);
        }, [desktop]);

        const backgroundForPage =(alias) => {
            Request({
                url: `${(userType === 1) ? endpointGetUserInfo : endpointGetClubInfo}${alias}`
            }, data => {
                setMenuBackground(data.headliner_link);
            }, error => {
                console.log(error.response);
            });
        };

        useEffect(() => {
            backgroundForPage(alias);
        }, [alias]);

        return (
            <div
                className={`widget-login class-for-grid-block3 ${login_page ? `active` : !isAuthenticated ? `__noAuth` : ''}`}
                style={{ padding: 0}}

            >
                {isAuthenticated
                    ?
                            <>
                                <div className={`widget-login__wrap ${open ? `_login_open ` : ''}`} ref={widgetLoginRef} onClick={handleChecked}>
                                    {isMobile1080
                                        ? <div className={`widget-login__user-icon`}
                                        >
                                            {footerNav?.image}
                                            <span style={{color: open && '#3366FF', userSelect: "none"  }}>{footerNav?.title}</span>
                                        </div>
                                        : <div className={`widget-login__user-icon${open ? ' _active' : !logo ? ' _no-logo' : ''}`}
                                               style={{ backgroundImage: `url(${logo ? logo : userType === 1 ? DEFAULT_IMG.userAvatar : DEFAULT_IMG.clubAvatar})` }}
                                        >

                                        </div>
                                    }
                                    {!isMobile1080 && <span>Профиль</span>}
                                </div>
                                <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                <CSSTransition
                                    in={open}
                                    timeout={350}
                                    classNames="widget-login-transition"
                                    unmountOnExit
                                >
                                    {
                                        isMobile1080
                                            ?
                                            <PopupModal
                                                showModal={open}
                                                handleClose={(e) => {
                                                    !widgetLoginRef.current.contains(e.target) && setOpen(false)
                                                }}
                                                bottomStyle
                                            >
                                                <div className="widget-login__inner">
                                                    <div className="widget-login__content">
                                                        <div className="widget-login__userpic-wrap">
                                                            <div className="widget-login__bg-box">
                                                                { menuBackground ? <img src={menuBackground} alt=""/> :  <img src='/static/images/widget-login/userpic-bg.jpg' alt=""/>}
                                                            </div>
                                                            <div className={`widget-login__userpic${open ? ' _active' : !logo ? ' _no-logo' : ''}`}
                                                                 style={{ backgroundImage: `url(${logo ? logo : userType === 1 ? DEFAULT_IMG.userAvatar : DEFAULT_IMG.clubAvatar})` }}
                                                            />
                                                        </div>
                                                        <div className="widget-login__username">
                                                            {userType === 1 &&
                                                            <Link to={`/user/${alias}`}>{firstName ? firstName : 'Аноним'}{lastName ? ' ' + lastName : ''}</Link>
                                                            }
                                                            {userType === 3  && alias !== 'rkf' && alias !== 'rkf-online' &&
                                                            <Link to={is_active_profile ? `/club/${alias}` : "/not-confirmed"}>{name}</Link>
                                                            }

                                                            {(userType === 5 || alias === 'rkf' || alias === 'rkf-online') &&
                                                            <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{name}</Link>
                                                            }
                                                            {userType === 4 &&
                                                            <Link to={is_active_profile ? `/kennel/${alias}` : "/kennel/activation"}>{name}</Link>
                                                            }
                                                        </div>

                                                        {/*<div className="widget-login__button-wrap">*/}
                                                        {/*    {is_active_profile &&*/}
                                                        {/*    <>*/}
                                                        {/*        {userType === 1 &&*/}
                                                        {/*        <Link className="widget-login__button" to={`/user/${alias}/edit`} >Редактировать профиль</Link>*/}
                                                        {/*        }*/}
                                                        {/*        {(userType === 3 || userType === 5) &&*/}
                                                        {/*        <Link className="widget-login__button" to="/client" >Редактировать профиль</Link>*/}
                                                        {/*        }*/}
                                                        {/*        {userType === 4 &&*/}
                                                        {/*        <Link className="widget-login__button" to={`/kennel/${alias}/edit`} >Редактировать профиль</Link>*/}
                                                        {/*        }*/}
                                                        {/*    </>*/}
                                                        {/*    }*/}
                                                        {/*</div>*/}

                                                        <ul className="widget-login__list">
                                                            {is_active_profile &&
                                                            <>
                                                                {userType === 1 &&
                                                                <>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/user/${alias}/edit`} >{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/user/${alias}/documents`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/user/${alias}`}>{widgetLoginIcon.profile}Страница пользователя</Link>
                                                                    </li>
                                                                </>
                                                                }
                                                                {userType === 3  && alias !== 'rkf' && alias !== 'rkf-online' &&
                                                                <>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to="/client" >{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/club/${alias}/documents/`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={is_active_profile ? `/club/${alias}` : "/not-confirmed"}>{widgetLoginIcon.profile}Страница клуба</Link>
                                                                    </li>
                                                                </>
                                                                }
                                                                { (userType === 5 || alias === 'rkf' || alias === 'rkf-online') &&
                                                                <>
                                                                    <li className="widget-login__item widget-login__item--edit" onClick={() => setOpen(false)}>

                                                                        <Link to="/client" >{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/${alias}/documents/`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{widgetLoginIcon.profile}Страница федерации</Link>
                                                                    </li>
                                                                </>
                                                                }
                                                                {userType === 4 &&
                                                                <>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/kennel/${alias}/edit`} >{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={`/kennel/${alias}/documents`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                    </li>
                                                                    <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                        <Link to={is_active_profile ? `/kennel/${alias}` : "/kennel/activation"}>{widgetLoginIcon.profile}Страница питомника</Link>
                                                                    </li>
                                                                </>
                                                                }
                                                                {accountType === 5 && userType === 5 &&
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <span onClick={() => setShowModal(true)}>{widgetLoginIcon.exitInClub}Войти в аккаунт клуба</span>
                                                                </li>
                                                                }
                                                                {accountType === 5 && userType !== 5 &&
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <span onClick={logoutAsUser}>{widgetLoginIcon.exitInClub}Выйти из аккаунта клуба</span>
                                                                </li>
                                                                }
                                                            </>
                                                            }
                                                            <li className="widget-login__item widget-login__item--logout" onClick={() => setOpen(false)}>

                                                                <Link to="/" onClick={logOutUser}>{widgetLoginIcon.exit}Выход</Link>
                                                            </li>

                                                            <li className="widget-login__item widget-login__add-user">
                                                                <div>Добавить пользователя</div>
                                                            </li>
                                                            {!isMobile1080 &&
                                                            <>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                                    <a className="widget-login__item-link" href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/" target="_blank" rel="noopener noreferrer">База знаний</a>
                                                                </li>
                                                                {/*<li className="widget-login__item">*/}
                                                                {/*     <Feedback />*/}

                                                                {/*</li>*/}
                                                            </>
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </PopupModal>
                                            :
                                            <div className="widget-login__content">
                                                    <div
                                                        className="widget-login__userpic-wrap"
                                                    >
                                                        { menuBackground ? <img src={menuBackground} alt=""/> :  <img src='/static/images/widget-login/userpic-bg.jpg' alt=""/>}
                                                        <div className={`widget-login__userpic${open ? ' _active' : !logo ? ' _no-logo' : ''}`}
                                                             style={{ backgroundImage: `url(${logo ? logo : userType === 1 ? DEFAULT_IMG.userAvatar : DEFAULT_IMG.clubAvatar})` }}
                                                        />
                                                    </div>
                                                    <div className="widget-login__username">
                                                        {userType === 1 &&
                                                        <Link to={`/user/${alias}`}>{firstName ? firstName : 'Аноним'}{lastName ? ' ' + lastName : ''}</Link>
                                                        }
                                                        {userType === 3 && alias !== 'rkf' && alias !== 'rkf-online' &&
                                                        <Link to={is_active_profile ? `/club/${alias}` : "/not-confirmed"}>{name}</Link>
                                                        }
                                                        {(userType === 5 || alias === 'rkf' || alias === 'rkf-online') &&
                                                        <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{name}</Link>
                                                        }
                                                        {userType === 4 &&
                                                        <Link to={is_active_profile ? `/kennel/${alias}` : "/kennel/activation"}>{name}</Link>
                                                        }
                                                    </div>
                                                    <ul className="widget-login__list">
                                                        {is_active_profile &&
                                                        <>
                                                            {userType === 1 &&
                                                            <>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/user/${alias}/edit`}>{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/user/${alias}/documents`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/user/${alias}`}>{widgetLoginIcon.profile}Страница пользователя</Link>
                                                                </li>
                                                            </>
                                                            }
                                                            {userType === 3 && alias !== 'rkf' && alias !== 'rkf-online' &&
                                                            <>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to="/client">{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/club/${alias}/documents/`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={is_active_profile ? `/club/${alias}` : "/not-confirmed"}>{widgetLoginIcon.profile}Страница клуба</Link>
                                                                </li>
                                                            </>
                                                            }
                                                            { (userType === 5 || alias === 'rkf' || alias === 'rkf-online') &&
                                                            <>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to="/client" >{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/${alias}/documents/`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={is_active_profile ? `/${alias}` : "/not-confirmed"}>{widgetLoginIcon.profile}Страница федерации</Link>
                                                                </li>
                                                            </>
                                                            }
                                                            {userType === 4 &&
                                                            <>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/kennel/${alias}/edit`}>{widgetLoginIcon.editProfile}Редактировать профиль</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={`/kennel/${alias}/documents`}>{widgetLoginIcon.lk}Личный кабинет</Link>
                                                                </li>
                                                                <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                    <Link to={is_active_profile ? `/kennel/${alias}` : "/kennel/activation"}> {widgetLoginIcon.profile}Страница питомника</Link>
                                                                </li>
                                                            </>
                                                            }
                                                            {accountType === 5 && (userType === 5 ||  alias === 'rkf' || alias === 'rkf-online') &&
                                                            <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                <span onClick={() => setShowModal(true)}>{widgetLoginIcon.exitInClub}Войти в аккаунт клуба</span>
                                                            </li>
                                                            }
                                                            {accountType === 5 && userType !== 5 && alias !== 'rkf' && alias !== 'rkf-online' &&
                                                            <li className="widget-login__item" onClick={() => setOpen(false)}>

                                                                <span onClick={logoutAsUser}>{widgetLoginIcon.exitInClub}Выйти из аккаунта клуба</span>
                                                            </li>
                                                            }
                                                        </>
                                                        }
                                                        <li className="widget-login__item widget-login__item--logout" onClick={() => setOpen(false)}>

                                                            <Link to="/" onClick={logOutUser}>{widgetLoginIcon.exit}Выход</Link>
                                                        </li>

                                                        <li className="widget-login__item widget-login__add-user">
                                                            <div>Добавить пользователя</div>
                                                        </li>
                                                        {!isMobile1080 &&
                                                        <>
                                                            <li className="widget-login__item" onClick={() => setOpen(false)}>
                                                                <a className="widget-login__item-link" href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/" target="_blank" rel="noopener noreferrer">База знаний</a>
                                                            </li>
                                                            {/*<li className="widget-login__item">*/}
                                                            {/*     <Feedback />*/}

                                                            {/*</li>*/}
                                                        </>
                                                        }
                                                    </ul>
                                                </div>


                                    }
                                </CSSTransition>
                                </OutsideClickHandler>
                            </>
                    : <AuthButtons />
                }

                <Modal className="widget-login__modal"
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    headerName="Войти как клуб"
                       iconName="enter-white"
                >
                    <LoginAsUser history={history} closeModal={() => setShowModal(false)} />
                </Modal>
            </div>
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(WidgetLogin)));