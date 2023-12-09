import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const MenuLink = (navItem) => {

    const [hoverMenu, setHoverMenu] = useState(false);

    return (
        <div className={hoverMenu ? "header__nav-item-hover __hover" : "header__nav-item-hover"}
             onMouseOver={() => setHoverMenu(true)}
             onMouseOut={()  => setHoverMenu(false)}>
            <NavLink
                to={navItem.to}
                exact={navItem.exact}
                className={`${navItem.disabled ? `header__nav-item-link _disabled` : `header__nav-item-link `}`}
                onClick={e => navItem.disabled ? e.preventDefault() : e}
            >
                {navItem.image}
                <span className={`${navItem.disabled ? `header__nav-item-title _disabled` : `header__nav-item-title `}`}>
                    {navItem.name}
                </span>
            </NavLink>
        </div>
    );
};

export default MenuLink;
