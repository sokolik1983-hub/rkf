import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { mainNav } from "../../../../appConfig";
import Feedback from "../../../Feedback";
import ClickGuard from "../../../ClickGuard";
import BurgerButton from "./BurgerButton";
import NavSublist from "./NavSublist";
import { connectAuthVisible } from "../../../../pages/Login/connectors";
import useIsMobile from "../../../../utils/useIsMobile";


const Nav = ({ isAuthenticated, login_page }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile(740);

    const setOverflow = (isOpen) => {
        if (window.innerWidth <= 990) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        } else if (window.innerWidth > 990 && isOpen) {
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        setOverflow(isOpen);
        window.addEventListener('resize', () => setOverflow(isOpen));
        return () => window.removeEventListener('resize', () => setOverflow(isOpen));
    }, [isOpen]);
console.log(isMobile)
    return (
        <nav className={`header__nav${!isMobile ? `--desktop` : ``}`}>
            {isMobile ?
                <>
                    <ClickGuard value={isOpen} callback={() => setIsOpen(false)} />
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
                        {!isAuthenticated && <li className="header__nav-item"><Feedback /></li>}
                    </ul>
                </>
                :
                <>
                    <ul className={`header__nav-list--desktop ${isAuthenticated ? ` _uthenticated` : ``}`}>
                        {mainNav.map(navItem => {
                            console.log(navItem)
                            return (

                                <li className="header__nav-item--desktop" key={navItem.id}>
                                {/*<LightTooltip title={navItem.title} enterDelay={200} leaveDelay={200}>*/}
                                    <NavLink
                                        to={navItem.to}
                                        exact={navItem.exact}
                                        className={`${navItem.disabled ? `header__nav-item-link _disabled` : `header__nav-item-link `}`}
                                        onClick={e => navItem.disabled ? e.preventDefault() : e}
                                    >
                                        {/*<div style={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>*/}
                                            {navItem.image}
                                            <span className="header__nav-item-title">{navItem.name}</span>

                                        {/*</div>*/}
                                    </NavLink>

                                {/*</LightTooltip>*/}
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