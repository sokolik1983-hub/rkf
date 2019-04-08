import React from 'react'
import {mainNav} from 'appConfig'
import {NavLink} from 'react-router-dom'
import './index.scss'

const Nav = () => <nav>
    <ul className="main-nav">
        {
            mainNav.map(navItem =>
                <li className="main-nav__item" key={navItem.id}>
                    <NavLink to={navItem.to}>{navItem.title}</NavLink>
                </li>
            )
        }
    </ul>
</nav>;

export default Nav;