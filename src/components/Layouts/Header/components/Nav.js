import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import {mainNavIcons} from "../../../../appConfig";


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
            <ul className="header__nav-list">
                {mainNavIcons.map(icon =>
                    <li className="header__nav-item" key={icon.id}>
                            <NavLink title={icon.title} to={icon.to} exact={icon.exact}>
                                {icon.image}
                            </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
};

export default React.memo(Nav);