import React from "react";
import {NavLink} from "react-router-dom";
import {userNav} from "./config";
import "./index.scss";


const UserMenu = ({alias}) => {

    return (
        <ul className="user-menu">
            {userNav(alias).map(navItem =>
                <li className="user-menu__item" key={navItem.id}>
                    <NavLink
                        to={navItem.to}
                        exact={false}
                        className={`user-menu__link ${navItem.disabled ? ' _disabled' : ''}`}
                        onClick={e => navItem.disabled ? e.preventDefault() : null}
                    >
                        {navItem.title}
                    </NavLink>
                </li>
            )}
        </ul>
    )
};

export default React.memo(UserMenu);