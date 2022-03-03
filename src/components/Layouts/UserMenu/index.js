import React, {memo, useState, useRef, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import { Link, NavLink, useLocation } from 'react-router-dom';
import Alert from "../../Alert";
import useIsMobile from "../../../utils/useIsMobile";
import PopupModal from "../../PopupModal";
import ls from 'local-storage';
import {endpointGetClubInfo} from "../../../pages/Club/config";
import {Request} from "../../../utils/request";
import {endpointGetUserInfo} from "../UserLayout/config";
import changeBackground from "../../../utils/changeBgInMobileMenu";
import nameInMobileMenu from "../../../utils/nameInMobileMenu";
import { clubNav } from "../../../pages/Club/config";
import {clubNav as clubNavDocs} from "../../../pages/Docs/config";
import { kennelNav } from "../../../pages/Nursery/config";
import {kennelNav as kennelNavDocs} from "../../../pages/NurseryDocuments/config";
import {userNav as userNavDocs} from "../../../pages/UserDocuments/config.js";

import "./index.scss";




const UserMenu = ({userNav, notificationsLength, isExhibitionPage, setOpenUserMenu, openUserMenu}) => {
    const [alert, setAlert] = useState(false);
    const [state, setState] = useState(state)
    const [clubInfo, setClubInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [menuBackground, setMenuBackground] = useState(null)
    const [nameInMenu, setNameInMenu] = useState(null)
    const [routes, setRoutes] = useState(userNav);
    const isMobile = useIsMobile(1080);
    const { user_type, alias, logo_link } = ls.get('user_info') || {};
    const clickOnDisabledLink = e => {
        e.preventDefault();
        setAlert(true);
    };

    const moreRef = useRef();
    const location = useLocation();
    let url =  location.pathname.split('/')[1];
    let orgAlias = location.pathname.split('/')[2];

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
            });
    };

    useEffect(() => {
        changeBackground(user_type, backgroundForPage, alias, orgAlias, url);
    },[url, orgAlias]);

    useEffect(() => {
        nameInMobileMenu(user_type,url,clubInfo, setNameInMenu, userInfo, setMenuBackground);
    },[userInfo, clubInfo]);

    useEffect(()=> {
        if(clubInfo) {
            let clubInfoArray;
            switch(url) {
                case "kennel":
                    clubInfoArray = kennelNav(clubInfo.club_alias).filter(item => item.title !== "Уведомления");
                    setRoutes(clubInfoArray);
                    break;
                case "club":
                    clubInfoArray = clubNav(clubInfo.club_alias).filter(item => item.title !== "Уведомления");
                    clubInfoArray.forEach(item => {
                        if(item.title !== "Мероприятия") {
                            item.to = `/club${item.to}`
                        }
                    })
                    setRoutes(clubInfoArray);
                    break;
                default:
                    break;
            }
            if (user_type === 3 && url !== 'kennel') {
                clubInfoArray = clubNav(clubInfo.club_alias).filter(item => item.title !== "Уведомления");
                clubInfoArray.forEach(item => {
                    if(item.title !== "Мероприятия") {
                        item.to = `/club${item.to}`
                    }
                });
                setRoutes(clubInfoArray);
            }
        }
        }, [clubInfo, userInfo]);

    const getMeLink = (user_type) => {
        switch (user_type) {
            case 1:
                return <Link onClick={closeLink} to={`/${url || 'user'}${'/'}${orgAlias || alias}`}>{nameInMenu}</Link>;
            case 3:
                return <Link onClick={closeLink} to={`/${url || 'club'}${'/'}${orgAlias || alias}`}>{nameInMenu}</Link>;
            case 4:
                return <Link onClick={closeLink} to={`/${url || 'kennel'}${'/'}${orgAlias || alias}`}>{nameInMenu}</Link>;
            case 5:
                if(url === 'club' || url === 'kennel') {
                    return <Link onClick={closeLink} to={`/${url}${'/'}${orgAlias || alias}`}>{nameInMenu}</Link>;
                }
                break;
            default:
                if(url === 'club' || url === 'kennel') {
                    return <Link onClick={closeLink} to={`/${url}${'/'}${orgAlias || alias}`}>{nameInMenu}</Link>;
                }
                break;
        };
    };

    const closeLink = (e) => {
        if(location.pathname === e.target.getAttribute('href')) {
            setOpenUserMenu(false);
        }
    };

    const checkFederationPage = () => {
        return location.pathname === '/rkf' ||
            location.pathname === '/rfss' ||
            location.pathname === '/rfls' ||
            location.pathname === '/rfos' ||
            location.pathname === '/oankoo';
    }


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
                                <div className="user-nav__bg-wrap">
                                    { menuBackground ? <img src={menuBackground} alt=""/> :  <img src='/static/images/user-nav/user-nav-bg.png' alt=""/>}
                                    <div className="user-nav__userpic">
                                        <img src={logo_link}/>
                                    </div>
                                </div>
                                {(!(location.pathname.search("documents") > -1) && !(location.pathname.search("bank-details") > -1))? <> {
                                    nameInMenu && <div className="user-nav__alias-name">
                                    {
                                        getMeLink(user_type)
                                    }
                                </div>}
                                    {!checkFederationPage() &&
                                        <ul className="user-nav__list">
                                            { routes.map(navItem => <li
                                                    className={ `user-nav__item${ isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : '' }` }
                                                    key={ navItem.id }>
                                                    <NavLink
                                                        to={ navItem.to }
                                                        exact={ navItem.exact }
                                                        className={ `user-nav__link${ navItem.disabled ? ' _disabled' : '' }` }
                                                        onClick={ e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false) }
                                                    >
                                                        { navItem.icon }
                                                        <span>{ navItem.title }</span>
                                                    </NavLink>
                                                    { navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength &&
                                                    <span
                                                        className={ `user-nav__item-notification${ notificationsLength > 99 ? ' _plus' : '' }` }>
                                                { notificationsLength > 99 ? 99 : notificationsLength }
                                            </span>
                                                    }
                                                </li>
                                            ) }
                                        </ul> }
                                    </>
                                    : user_type === 3 ?
                                    <ul className="user-nav__list">
                                    {clubNavDocs(alias).map(navItem =>  <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`}
                                                                 key={navItem.id}>
                                            {navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength &&
                                                <span
                                                    className={`user-nav__item-notification${notificationsLength > 99 ? ' _plus' : ''}`}>
                                    {notificationsLength > 99 ? 99 : notificationsLength}
                                </span>
                                            }
                                            <NavLink
                                                to={user_type === 3
                                                && url === 'club'
                                                && alias !== 'rkf'
                                                && alias !== 'rkf-online'
                                                && navItem.title !== 'Поиск по базе РКФ'
                                                && navItem.title !== 'Реквизиты и размеры взносов'
                                                && navItem.title !== 'Мероприятия'
                                                    ? `/club${navItem.to}` : navItem.to}
                                                exact={navItem.exact}
                                                className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                                onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
                                            >
                                                {navItem.icon}
                                                <span>{navItem.title}</span>
                                            </NavLink>
                                        </li>

                                    )}
                                    </ul>
                                    : user_type === 4 ? (
                                            <ul className="user-nav__list">
                                                {kennelNavDocs(alias).map(navItem =>  <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`}
                                                                                        key={navItem.id}>
                                                        <NavLink
                                                            to={user_type === 3
                                                            && url === 'club'
                                                            && alias !== 'rkf'
                                                            && alias !== 'rkf-online'
                                                            && navItem.title !== 'Поиск по базе РКФ'
                                                            && navItem.title !== 'Реквизиты и размеры взносов'
                                                            && navItem.title !== 'Мероприятия'
                                                                ? `/club${navItem.to}` : navItem.to}
                                                            exact={navItem.exact}
                                                            className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                                            onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
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
                                        ) : user_type === 1 && (<ul className="user-nav__list">
                                            {userNavDocs(alias).map(navItem =>  <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`}
                                                                                      key={navItem.id}>
                                                    <NavLink
                                                        to={user_type === 3
                                                        && url === 'club'
                                                        && alias !== 'rkf'
                                                        && alias !== 'rkf-online'
                                                        && navItem.title !== 'Поиск по базе РКФ'
                                                        && navItem.title !== 'Реквизиты и размеры взносов'
                                                        && navItem.title !== 'Мероприятия'
                                                            ? `/club${navItem.to}` : navItem.to}
                                                        exact={navItem.exact}
                                                        className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                                        onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
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
                                        </ul>)
                                    }
                            </div>

                        </PopupModal>
                        :
                        <ul className="user-nav__list">
                            {userNav.map(navItem =>  <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`}
                                key={navItem.id}>
                                <NavLink
                                    to={user_type === 3
                                        && url === 'club'
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