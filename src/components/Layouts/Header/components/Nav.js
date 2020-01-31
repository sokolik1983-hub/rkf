import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import ClickGuard from "../../../ClickGuard";
import BurgerButton from "./BurgerButton";
import NavSublist from "./NavSublist";
import Feedback from "../../../Feedback";
import {mainNav} from "../../../../appConfig";


const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                    <Feedback/>
                </li>
            </ul>
        </nav>
    )
};

export default React.memo(Nav);