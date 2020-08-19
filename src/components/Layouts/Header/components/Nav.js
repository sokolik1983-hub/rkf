import React from 'react';
import {NavLink} from 'react-router-dom';
import {mainNavIcons} from "../../../../appConfig";
import Tooltip from "@material-ui/core/Tooltip";


const Nav = () => {

    return (
        <nav className="header__nav">
            <ul className="header__nav-list">
                {mainNavIcons.map(icon =>
                    <li className="header__nav-item" key={icon.id}>
                        <Tooltip title={icon.title} enterDelay={200} leaveDelay={200}>
                            <NavLink to={icon.to} exact={icon.exact}>
                                <img className="header__nav-img" src={icon.imageSrc} width="27" height="27" alt=""/>
                            </NavLink>
                        </Tooltip>
                    </li>
                )}
            </ul>
        </nav>
    )
};

export default React.memo(Nav);