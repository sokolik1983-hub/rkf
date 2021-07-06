import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { mainNav } from "../../../../appConfig";
import Feedback from "../../../Feedback";
import ClickGuard from "../../../ClickGuard";
import BurgerButton from "./BurgerButton";
import NavSublist from "./NavSublist";
import { connectAuthVisible } from "../../../../pages/Login/connectors";
import useIsMobile from "../../../../utils/useIsMobile";
import MenuLink from "./MenuLink";


const Nav = ({ isAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <nav className={`header__nav${!isMobile ? `--desktop` : ``}`}>
            {isMobile ?
                <>
                    {/*<ClickGuard value={isOpen} callback={() => setIsOpen(false)} />*/}
                    <BurgerButton
                        className={isOpen ? '_open' : ''}
                        onClick={() => setIsOpen(!isOpen)}
                    />
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
                        <li className="widget-login__item" onClick={() => setIsOpen(false)} style={{    padding: "8px 32px"}}>
                                        <a style={{ color: '#3366ff' }} href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/" target="_blank" rel="noopener noreferrer">База знаний</a>
                            <Feedback/>
                        </li>
                        {!isAuthenticated && <li className="header__nav-item"><Feedback /></li>}
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
                            }
                        )}

                    </ul>
                </>
            }

        </nav>
    )
};

export default React.memo(connectAuthVisible(Nav));