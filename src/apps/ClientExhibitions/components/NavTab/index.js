import React from 'react'
import {NavLink} from 'react-router-dom'
import './styles.scss'

export const NavTabs = ({children}) =>
    <div className="nav-tabs">
        {children}
    </div>;

const NavTab = ({to, children}) =>
    <NavLink to={to} className="nav-tab">
        {children}
    </NavLink>;

export default NavTab