import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { mainNav } from "../../../../appConfig";
import Feedback from "../../../Feedback";
import ClickGuard from "../../../ClickGuard";
import NavSublist from "./NavSublist";
import { connectAuthVisible } from "../../../../pages/Login/connectors";
import useIsMobile from "../../../../utils/useIsMobile";
import MenuLink from "./MenuLink";

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
    const strokeColor = isOpen ? '#3366FF' : '#90999E'

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
                        {mainNav.map(navItem =>
                            <li className="header__nav-item" key={navItem.id}>
                                {navItem.children ?
                                    <NavSublist setIsOpen={setIsOpen} navItem={navItem} /> :
                                    <NavLink
                                        to={navItem.to}
                                        exact={navItem.exact}
                                        className={navItem.disabled ? '_disabled' : ''}
                                        onClick={e => navItem.disabled ? e.preventDefault() : setIsOpen(false)}
                                    >
                                        {navItem.image}
                                        <span>{navItem.name}</span>
                                    </NavLink>
                                }

                            </li>
                        )}
                        <li className="widget-login__item"
                            onClick={() => setIsOpen(false)}
                            style={{padding: "8px 32px"}}>
                                <a href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    База знаний
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
                    </ul>
                </>
            }

        </nav>
    )
};

export default React.memo(connectAuthVisible(Nav));