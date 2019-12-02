import React from 'react';
import {NavLink} from 'react-router-dom';
import {mainNav} from "../../../../appConfig";

const Nav = () => (
    <nav className="Header__nav">
        <ul className="Header__nav-list">
            {mainNav.map(navItem =>
                <li className="Header__nav-item" key={navItem.id}>
                    <NavLink to={navItem.to}>{navItem.title}</NavLink>
                </li>
            )}
        </ul>
    </nav>
);

export default Nav;