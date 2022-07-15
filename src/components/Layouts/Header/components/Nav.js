import React, {memo, useEffect, useMemo, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import ClickGuard from "../../../ClickGuard";
import Feedback from "../../../Feedback";
import ZlineWidget from "../../../ZLineWidget";
import NavSublist from "./NavSublist";
import MenuLink from "./MenuLink";
import {mainNav} from "../../../../appConfig";
import {connectAuthVisible} from "../../../../pages/Login/connectors";
import useIsMobile from "../../../../utils/useIsMobile";


const Nav = ({isAuthenticated, needChangeIsOpen, isOpenFilters, isOpen, setShowFilters, setOpen}) => {
    const [showZlineModal, setShowZlineModal] = useState(false);
    const isMobile = useIsMobile(1080);
    const location = useLocation();
    const apiKey = localStorage.getItem('apikey');

    const links = useMemo(() => [
        {
            name: 'RKF.org.ru',
            icon: '/static/images/header/rkf-logo-transparent.svg',
            link: 'http://rkf.org.ru',
            class: 'rkf-org',
        },
        {
            name: 'HelpRKF.Online',
            icon: '/static/images/header/rkf-logo-transparent.svg',
            link: 'http://help.rkf.online',
            class: 'rkf-online',
        },
        {
            name: 'RKF.Academy',
            icon: '/static/images/about/rkf_academy.png',
            link: 'http://rkf.academy',
            class: 'rkf-academy',
        }
    ], []);

    const strokeColor = isOpen ? 'stroke-color__active' : 'stroke-color__inactive';

    const setOverflow = isOpen => {
        if (window.innerWidth <= 1080) {
            document.body.style.overflow = isOpen || isOpenFilters ? 'hidden' : '';
            if (window.innerWidth > 680 && isOpenFilters) {
                document.body.style.overflow = '';
            }
        } else if (window.innerWidth > 1080 && isOpen) {
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        setOverflow(isOpen);

        window.addEventListener('resize', () => setOverflow(isOpen));

        return () => window.removeEventListener('resize', () => setOverflow(isOpen));
    }, [isOpen]);

    useEffect(() => {
        if (isOpenFilters) {
            setShowFilters({isOpen: false});
        }
    }, [isOpenFilters]);

    const handleZlineClick = e => {
        e.preventDefault();
        setShowZlineModal(true);
    };

    const checkLinkRkfOrg = () => {
        const search = decodeURI(location.search.replace('?', ''));

        if(search) {
            const params = search.split('&').reduce((prev, curr) => {
                const param = curr.split('=');

                if(param.length > 1) {
                    prev[param[0]] = param[1];
                } else {
                    prev = param[0];
                }

                return prev;
            }, {});

            if(typeof params !== 'string' && params.redirect === 'http://rkf.org.ru/' && params.id) {
                if (isAuthenticated) {
                    window.location.href = `http://rkf.org.ru/zapis-na-poseshhenie-ofisa-rkf/?ak=${apiKey}&id=${params.id}`;
                } else {
                    setShowZlineModal(true);
                    localStorage.setItem('rkforg_zline', params.id);
                }
            }
        }
    };

    const checkRkfOrgZline = () => {
        if (localStorage.getItem('rkforg_zline') && isAuthenticated) {
            const id = localStorage.getItem('rkforg_zline');

            localStorage.removeItem('rkforg_zline');
            window.location.href = `http://rkf.org.ru/zapis-na-poseshhenie-ofisa-rkf/?ak=${apiKey}&id=${id}`;
        }
    };

    useEffect(() => {
        checkLinkRkfOrg();
    }, []);

    useEffect( () => {
        checkRkfOrgZline();
    }, [showZlineModal, isAuthenticated]);

    return (
        <nav className={`header__nav${!isMobile ? '--desktop' : ''}`}>
            {isMobile ?
                <>
                    <ClickGuard value={isOpen} callback={() => setShowFilters({isOpen: false})} />
                    <div
                        className="header__nav-burger"
                        onClick={() => {
                            setShowFilters({isOpen: !isOpen});
                            needChangeIsOpen(!isOpen);
                        }}
                    >
                        <div>
                            {isOpen ?
                                <svg className={`no-scale ${strokeColor}`} width='20' height='20' viewBox='0 0 20 20' fill='none'
                                              xmlns='http://www.w3.org/2000/svg'>
                                    <line y1='1' x1='1' x2='20' y2='20' strokeWidth='1.32' />
                                    <line y1='20' x1='1' x2='20' y2='1' strokeWidth='1.32' />
                                </svg> :
                                <svg className={`no-scale ${strokeColor}`} width='20' height='14' viewBox='0 0 20 14' fill='none'
                                              xmlns='http://www.w3.org/2000/svg'>
                                    <line y1='1.34' x2='20' y2='1.34' strokeWidth='1.32' />
                                    <line y1='7.34' x2='20' y2='7.34' strokeWidth='1.32' />
                                    <line y1='13.34' x2='20' y2='13.34' strokeWidth='1.32' />
                                </svg>
                            }
                        </div>
                        <span className={`header__nav-menu${isOpen ? ' _open' : ''}`}>
                            {isOpen ? 'Закрыть' : 'Меню'}
                        </span>
                    </div>
                    <ul className={`header__nav-list${isOpen ? ' _open' : ''}`}>
                        <h3 className="headerPopupH3">Меню</h3> {/*если будет время, сделайте нормальное меню*/}
                        {mainNav.map(navItem =>
                            <li className="header__nav-item" key={navItem.id}>
                                {navItem.children ?
                                    <NavSublist setShowFilters={setShowFilters} navItem={navItem} /> :
                                    <NavLink
                                        to={navItem.to}
                                        exact={navItem.exact}
                                        className={navItem.disabled ? '_disabled' : ''}
                                        onClick={e => navItem.disabled ?
                                            e.preventDefault() : setShowFilters({isOpen: false})
                                        }
                                    >
                                        {navItem.image}
                                        <span>{navItem.name}</span>
                                    </NavLink>
                                }
                            </li>
                        )}
                        <li className="header__nav-item __about">
                            <NavLink to="/about" exact={false}>
                                <span>O RKF.Online</span>
                            </NavLink>
                        </li>
                        <li className="widget-login__item widget-login__item--menu popup-menu auth-clubs"
                            onClick={() => setShowFilters({isOpen: false})}>
                            <Link className="map-link" to="/clubs-map" target="_blank">Карта авторизованных клубов</Link>
                        </li>
                        <li className="widget-login__item widget-login__item--menu popup-menu support-center"
                            onClick={() => setShowFilters({isOpen: false})}>
                            <Feedback />
                        </li>
                        {links.map((item, index) =>
                            <li
                                className={`widget-login__item widget-login__item--menu popup-menu ${item.class}`}
                                key={index}
                                onClick={() => setShowFilters({isOpen: false})}
                            >
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        )}
                        <li className="header__nav-socials">
                            {/*<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/">*/}
                            {/*    <img src="/static/icons/social/facebook-grey.svg" alt="" />*/}
                            {/*</a>*/}
                            <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed">
                                <img src="/static/icons/social/vk-grey.svg" alt="" />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig">
                                <img src="/static/icons/social/youtube-grey.svg" alt="" />
                            </a>
                            {/*<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/">*/}
                            {/*    <img src="/static/icons/social/instagram-grey.svg" alt="" />*/}
                            {/*</a>*/}
                            <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial">
                                <img src="/static/icons/social/telegram-grey.svg" alt="" />
                            </a>
                        </li>
                    </ul>
                </>
                :
                <>
                    <ul className={`header__nav-list--desktop${isAuthenticated ? ' _uthenticated' : ''}`}>
                        {mainNav.map(navItem =>
                            <li className="header__nav-item--desktop" key={navItem.id}>
                                <MenuLink {...navItem} />
                            </li>
                        )}
                        <li className="header__nav-item--desktop Feedback">
                            <Feedback isMainNav title="Поддержка" />
                        </li>
                    </ul>
                    <Link to="/" className="header__nav-item--desktop recording" onClick={e => handleZlineClick(e)}>
                        <svg width='23' height='24' viewBox='0 0 23 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M20.6696 5.51138V2.97113C20.6696 1.8884 19.7951 1 18.6985 1H2.97113C1.87451 1 1 1.87451 1 2.97113V22.6408C1 23.7235 1.87451 24.6119 2.97113 24.6119H18.7124C19.7951 24.6119 20.6835 23.7374 20.6835 22.6408V11.7579'
                                stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10' strokeLinejoin='round' />
                            <path
                                d='M12.2576 16.9633L15.256 17.1854L23.1405 9.30084C23.9039 8.53738 23.9039 7.28807 23.1405 6.52461L22.6963 6.08041C21.9328 5.31695 20.6835 5.31695 19.92 6.08041L12.0355 13.9649L12.2576 16.9633Z'
                                stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10' strokeLinejoin='round' />
                            <path d='M5.21985 5.51123H16.3248' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                  strokeLinejoin='round' />
                            <path d='M5.21985 9.71729H15.7834' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                  strokeLinejoin='round' />
                            <path d='M5.21985 13.9233H12.0355' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                  strokeLinejoin='round' />
                            <path d='M5.21985 18.1294H9.55078' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                  strokeLinejoin='round' />
                        </svg>
                        <span>Записаться</span>
                    </Link>
                </>
            }
            <ZlineWidget
                isModalShow={showZlineModal}
                handleClose={() => {
                    setShowZlineModal(false);
                    if(!isMobile) {
                        setOpen(false);
                    }
                }}
                iframeLink={process.env.NODE_ENV === 'production' ?
                    'https://zline.me/widgets/registration-for-service?id=33' :
                    'https://zsstage.uep24.ru/widgets/registration-for-service?id=92'
                }
            />
        </nav>
    );
};

export default memo(connectAuthVisible(Nav));