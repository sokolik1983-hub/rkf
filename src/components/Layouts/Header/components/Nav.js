import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { mainNavIcons, mainNav } from "../../../../appConfig";
import Tooltip from "@material-ui/core/Tooltip";
import Feedback from "../../../Feedback";
import ClickGuard from "../../../ClickGuard";
import BurgerButton from "./BurgerButton";
import NavSublist from "./NavSublist";
import { connectAuthVisible } from "../../../../pages/Login/connectors";

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#fffeff',
        color: '#72839c',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        boxShadow: '0px 4px 25px rgba(51, 102, 255, 0.15)',
        lineHeight: 1,
        paddingBottom: 6,
    },
}))(Tooltip);

const Nav = ({ isAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 990));
        return window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 990));
    }, []);

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

    return (
        <nav className="header__nav">
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
                                    <NavLink to={navItem.to} exact={navItem.exact} onClick={() => setIsOpen(false)}>
                                        {navItem.title}
                                    </NavLink>
                                }
                            </li>
                        )}
                        <li className="header__nav-item">
                            <Feedback />
                        </li>
                    </ul>
                </>
                :
                <>
                    <ul className="header__nav-list">
                        {mainNavIcons.map(icon =>
                            <li className={`header__nav-item ${icon.disabled ? `disabled` : ``}`} key={icon.id}>
                                <LightTooltip title={icon.title} enterDelay={200} leaveDelay={200}>
                                    <NavLink className={icon.disabled ? `_disabled` : ``} to={icon.to} exact={icon.exact}>
                                        {icon.image}
                                    </NavLink>
                                </LightTooltip>
                            </li>
                        )}
                    </ul>
                    {!isAuthenticated ? <div className="header__nav-item _feedback">
                        <Feedback isMainNav={true} />
                    </div> : ``}
                </>
            }
        </nav>
    )
};

export default React.memo(connectAuthVisible(Nav));