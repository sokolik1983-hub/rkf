import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { mainNav } from "../../../../appConfig";
import Feedback from "../../../Feedback";
import ClickGuard from "../../../ClickGuard";
import NavSublist from "./NavSublist";
import { connectAuthVisible } from "../../../../pages/Login/connectors";
import useIsMobile from "../../../../utils/useIsMobile";
import MenuLink from "./MenuLink";
// import Support from "./../../../../pages/About/components/Support";

const Nav = ({ isAuthenticated, needChangeIsOpen, isOpenFilters, isOpen, setIsOpen}) => {

    const isMobile = useIsMobile(1080);

    const setOverflow = (isOpen) => {
        if (window.innerWidth <= 1080) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
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
        if(isOpenFilters) {
            setIsOpen(false);
        }
    }, [isOpenFilters]);

    const menuTitle = isOpen ? 'Закрыть' : 'Меню';
    const strokeColor = isOpen ? '#3366FF' : '#90999E';

    return (
        <nav className={`header__nav${!isMobile ? `--desktop` : ``}`}>
            {isMobile ?
                <>
                    <ClickGuard value={isOpen}
                                callback={() => setIsOpen(false)}/>

                    <div className={'header__nav-burger'}
                        onClick={() => {
                        setIsOpen(!isOpen);
                        needChangeIsOpen(!isOpen);
                    }}>
                        <div>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="1.34" x2="20" y2="1.34" stroke={strokeColor}  strokeWidth="1.32"/>
                                <line y1="7.34" x2="20" y2="7.34" stroke={strokeColor} strokeWidth="1.32"/>
                                <line y1="13.34" x2="20" y2="13.34" stroke={strokeColor}  strokeWidth="1.32"/>
                            </svg>

                        </div>

                         <span className={isOpen ? "header__nav-menu _open" : "header__nav-menu"}>{menuTitle}</span>
                    </div>

                    <ul className={`header__nav-list${isOpen ? ' _open' : ''}`}>
                        {mainNav.map((navItem, i, arr) =>  <li className="header__nav-item" key={navItem.id}>
                                    {navItem.children ?
                                        <NavSublist setIsOpen={setIsOpen} navItem={navItem}/> :
                                        <NavLink
                                            to={navItem.to}
                                            exact={navItem.exact}
                                            className={navItem.disabled ? '_disabled' : ''}
                                            onClick={e => navItem.disabled ? e.preventDefault() : setIsOpen(false)}
                                        >
                                            {navItem.image}
                                            <span >{navItem.name}</span>
                                        </NavLink>
                                    }
                                </li>
                        )}
                        <li className="widget-login__item popup-menu"
                            onClick={() => setIsOpen(false)}
                            >
                                <a href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    <span>База знаний</span>
                                </a>
                            <Feedback/>
                        </li>
                        {/*{!isAuthenticated && <li className="header__nav-item"><Feedback /></li>}*/}
                    </ul>
                </>
                :
                <>
                    <ul className={`header__nav-list--desktop ${isAuthenticated ? ` _uthenticated` : ``}`}>
                        {mainNav.map(navItem => {
                            return (
                                <li className="header__nav-item--desktop" key={navItem.id}>
                                    <MenuLink  {...navItem}/>
                                </li>
                            )
                        })}
                        {!isMobile &&
                        <li className="header__nav-item--desktop Feedback"><Feedback isMainNav title='Поддержка'/></li>
                        }
                    </ul>
                    {/*{!isMobile &&*/}
                    {/*<div className="header__nav-item--desktop Feedback"><Feedback isMainNav title='Поддержка'/></div>*/}
                    {/*}*/}
                        <Link className="header__nav-item--desktop recording" to="/booking">
                            <svg width="23" height="24" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.6696 5.51138V2.97113C20.6696 1.8884 19.7951 1 18.6985 1H2.97113C1.87451 1 1 1.87451 1 2.97113V22.6408C1 23.7235 1.87451 24.6119 2.97113 24.6119H18.7124C19.7951 24.6119 20.6835 23.7374 20.6835 22.6408V11.7579" stroke="#8F989D" strokeWidth="1.6" strokeMiterlimit="10" strokeLinejoin="round"/>
                                <path d="M12.2576 16.9633L15.256 17.1854L23.1405 9.30084C23.9039 8.53738 23.9039 7.28807 23.1405 6.52461L22.6963 6.08041C21.9328 5.31695 20.6835 5.31695 19.92 6.08041L12.0355 13.9649L12.2576 16.9633Z" stroke="#8F989D" strokeWidth="1.6" strokeMiterlimit="10" strokeLinejoin="round"/>
                                <path d="M5.21985 5.51123H16.3248" stroke="#8F989D" strokeWidth="1.6" strokeMiterlimit="10" strokeLinejoin="round"/>
                                <path d="M5.21985 9.71729H15.7834" stroke="#8F989D" strokeWidth="1.6" strokeMiterlimit="10" strokeLinejoin="round"/>
                                <path d="M5.21985 13.9233H12.0355" stroke="#8F989D" strokeWidth="1.6" strokeMiterlimit="10" strokeLinejoin="round"/>
                                <path d="M5.21985 18.1294H9.55078" stroke="#8F989D" strokeWidth="1.6" strokeMiterlimit="10" strokeLinejoin="round"/>
                            </svg>
                            <span>Записаться</span>
                        </Link>

                </>
            }

        </nav>
    )
};

export default React.memo(connectAuthVisible(Nav));