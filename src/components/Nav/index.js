import React from 'react'
import {mainNav} from 'appConfig'
import {NavLink} from 'react-router-dom'

const Nav = () => <nav>
    <ul id="main-navigation">
        {
            mainNav.map(navItem =>
                <li key={navItem.to}>
                    <NavLink to={navItem.to}>{navItem.title}</NavLink>
                </li>
            )
        }
    </ul>
</nav>;

export default Nav;