import React, {memo, useState, useRef, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import {NavLink, useLocation} from "react-router-dom";
import Alert from "../../Alert";
import useIsMobile from "../../../utils/useIsMobile";
import PopupModal from "../../PopupModal";
import ls from 'local-storage';
import {endpointGetClubInfo} from "../../../pages/Club/config";
import {Request} from "../../../utils/request";
import {endpointGetUserInfo} from "../UserLayout/config";

import "./index.scss";


const UserMenu = ({userNav, notificationsLength, isExhibitionPage, setOpenUserMenu, openUserMenu}) => {
    const [alert, setAlert] = useState(false);
    const [state, setState] = useState(state)
    const [clubInfo, setClubInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [menuBackground, setMenuBackground] = useState(null)
    const [nameInMenu, setNameInMenu] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile(1080);
    const { user_type, alias } = ls.get('user_info') || {};
    const clickOnDisabledLink = e => {
        e.preventDefault();
        setAlert(true);
    };


    const moreRef = useRef();
    const location = useLocation();
    let url =  location.pathname.split('/')[1];
    let orgAlias = location.pathname.split('/')[2];

    const changeBackground = () => {
        switch (user_type) {
            case 3:
            case 4:
                switch (url) {
                    case 'club':
                    case 'kennel':
                        backgroundForPage(orgAlias, endpointGetClubInfo);
                        break;
                    default:
                        backgroundForPage(alias, endpointGetClubInfo)
                        break;
                }
                break;
            case 1:
                switch (url) {
                    case 'club':
                    case 'kennel':
                        backgroundForPage(orgAlias, endpointGetClubInfo);
                        break;
                    case 'user':
                        backgroundForPage(orgAlias, endpointGetUserInfo)
                        break;
                    default:
                        backgroundForPage(alias, endpointGetUserInfo)
                        break;
                }
                break;
            case 5:
                switch (url) {
                    case 'club':
                    case 'kennel':
                        backgroundForPage(orgAlias, endpointGetClubInfo);
                        break;
                    default:
                        backgroundForPage(alias, endpointGetUserInfo)
                        break;
                }
                break;
            default:
                switch (url) {
                    case 'club':
                    case 'kennel':
                        backgroundForPage(orgAlias, endpointGetClubInfo);
                        break;
                    default:
                        break;
                }
                break;
        }
    }

    const backgroundForPage =(orgAlias, request) => { //Получаем алиас юзеров разных типов и образец запроса на сервер от разных юзеров.
           Request({
                url: request + orgAlias
            }, data => {
               if(request === endpointGetClubInfo) {
                   setClubInfo({...data})  //Получаем инфу о клубе, питомнике
               } else if (request === endpointGetUserInfo) {
                   setUserInfo({...data}) //Получаем инфу о физ. лице
               }
            }, error => {
                console.log(error.response);
                setError(error.response);
                setLoading(false);
            })
            // return () => setNeedRequest(true);
    }

    useEffect(() => {
            switch (user_type) {
                case 1:
                    switch (url) {
                        case 'club':
                            clubInfo && setNameInMenu(clubInfo.short_name);
                            break;
                        case 'kennel':
                            clubInfo && setNameInMenu(clubInfo.name);
                            break;
                        default:
                            userInfo && setMenuBackground(userInfo.headliner_link);
                            userInfo && setNameInMenu(`${userInfo.personal_information.first_name} ${userInfo.personal_information.last_name}`);
                            break;
                    }
                    break;
                case 3:
                    switch (url) {
                        case 'club':
                            clubInfo && setNameInMenu(clubInfo.short_name);
                            break;
                        case 'kennel':
                            clubInfo && setNameInMenu(clubInfo.name);
                            break;
                        default:
                            clubInfo && setMenuBackground(clubInfo.headliner_link);
                            clubInfo && setNameInMenu(clubInfo.short_name);
                            break;
                    }
                    break;
                case 4:
                    switch (url) {
                        case 'club':
                            clubInfo && setNameInMenu(clubInfo.short_name);
                            break;
                        case 'kennel':
                            clubInfo && setNameInMenu(clubInfo.name);
                            break;
                        default:
                            clubInfo && setMenuBackground(clubInfo.headliner_link);
                            clubInfo && setNameInMenu(clubInfo.name);
                            break;
                    }
                    break;
                case 5:
                    switch (url) {
                        case 'club':
                            clubInfo && setNameInMenu(clubInfo.short_name);
                            break;
                        case 'kennel':
                            clubInfo && setNameInMenu(clubInfo.name);
                            break;
                        default:
                            break;
                    }
                default:
                    switch (url) {
                        case 'club':
                            clubInfo && setNameInMenu(clubInfo.short_name);
                            clubInfo && console.log('ya ne avtorizovan',clubInfo.short_name )
                            break;
                        case 'kennel':
                            clubInfo && setNameInMenu(clubInfo.name);
                            clubInfo && console.log('ya ne avtorizovan',clubInfo.name )
                            break;
                        default:
                            break;
                    }
                    break;
            }
             clubInfo && setMenuBackground(clubInfo.headliner_link);

    }, [userInfo, clubInfo]);

    useEffect(() => {
        changeBackground();
    },[])
    return (
        <div
            className={`user-nav${isMobile ? '' : ' _desktop_card'}`}
        >
                {isMobile &&
                <button onClick={() => setOpenUserMenu(!openUserMenu)}
                        className={`user-nav__button more-btn${openUserMenu ? ' _open' : ''}`}
                        ref ={moreRef}
                >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.04099 13.8913C3.99341 13.5411 3.42809 12.4079 3.7783 11.3604C4.12852 10.3128 5.26165 9.74745 6.30923 10.0977C7.35681 10.4479 7.92214 11.581 7.57192 12.6286C7.40374 13.1317 7.04261 13.5473 6.56797 13.7841C6.09333 14.0209 5.54406 14.0595 5.04099 13.8913ZM11.3655 13.8968C10.318 13.5466 9.75264 12.4135 10.1029 11.3659C10.4531 10.3183 11.5862 9.753 12.6338 10.1032C13.6814 10.4534 14.2467 11.5866 13.8965 12.6341C13.7283 13.1372 13.3672 13.5529 12.8925 13.7897C12.4179 14.0265 11.8686 14.065 11.3655 13.8968ZM17.6901 13.9024C16.6425 13.5522 16.0772 12.419 16.4274 11.3715C16.7776 10.3239 17.9108 9.75855 18.9583 10.1088C20.0059 10.459 20.5712 11.5921 20.221 12.6397C20.0528 13.1428 19.6917 13.5584 19.2171 13.7952C18.7424 14.032 18.1932 14.0706 17.6901 13.9024Z"/>
                        </svg>
                        Еще
                    </button>
                }
            <CSSTransition
                in={!isMobile || (isMobile && openUserMenu)}
                timeout={350}
                classNames="user-nav__transition"
                unmountOnExit
            >
                {
                    isMobile
                        ?
                        <PopupModal
                            showModal={openUserMenu}
                            handleClose={(e) => !moreRef.current.contains(e.target) && setOpenUserMenu(false)}
                            bottomStyle
                        >
                            <div className="user-nav__inner">
                                {/*<div className="close-btn" onClick={() => setOpenUserMenu(false)}>
                                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#90999E"/>
                                    </svg>
                                </div>*/}
                                <div className="testDiv">
                                    { menuBackground ? <img src={menuBackground} alt=""/> :  <img src='/static/images/user-nav/user-nav-bg.png' alt=""/>}
                                </div>
                                { nameInMenu && <p className="user-nav__alias-name">{nameInMenu}</p>}
                                <ul className="user-nav__list">
                                    {userNav.map(navItem => <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`}
                                            key={navItem.id}>
                                            <NavLink
                                                to={user_type === 3
                                                    && alias !== 'rkf'
                                                    && alias !== 'rkf-online'
                                                    && navItem.title !== 'Поиск по базе РКФ'
                                                    && navItem.title !== 'Реквизиты и размеры взносов'
                                                    && navItem.title !== 'Мероприятия'
                                                    ? `/club${navItem.to}` : navItem.to}
                                                exact={navItem.exact}
                                                className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                                onClick={e => navItem.disabled ? clickOnDisabledLink(e) : null}
                                            >
                                                {navItem.icon}
                                                <span>{navItem.title}</span>
                                            </NavLink>
                                            {navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength &&
                                            <span
                                                className={`user-nav__item-notification${notificationsLength > 99 ? ' _plus' : ''}`}>
                                                {notificationsLength > 99 ? 99 : notificationsLength}
                                            </span>
                                            }
                                        </li>
                                    )}
                                </ul>
                            </div>

                        </PopupModal>
                        :
                        <ul className="user-nav__list">
                            {userNav.map(navItem =>  <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`}
                                key={navItem.id}>
                                <NavLink
                                    to={user_type === 3
                                        && alias !== 'rkf'
                                        && alias !== 'rkf-online'
                                        && navItem.title !== 'Поиск по базе РКФ'
                                        && navItem.title !== 'Реквизиты и размеры взносов'
                                        && navItem.title !== 'Мероприятия'
                                        ? `/club${navItem.to}` : navItem.to}
                                    exact={navItem.exact}
                                    className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                    onClick={e => navItem.disabled ? clickOnDisabledLink(e) : null}
                                >
                                    {navItem.icon}
                                    <span>{navItem.title}</span>
                                </NavLink>
                                {navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength &&
                                <span
                                    className={`user-nav__item-notification${notificationsLength > 99 ? ' _plus' : ''}`}>
                                    {notificationsLength > 99 ? 99 : notificationsLength}
                                </span>
                                }
                            </li>

                            )}
                        </ul>
                }
                </CSSTransition>
            {alert &&
            <Alert
                title="Внимание!"
                text="Раздел находится в разработке."
                autoclose={1.5}
                onOk={() => setAlert(false)}
            />
            }
            </div>
    )
};

export default memo(UserMenu);