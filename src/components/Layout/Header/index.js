import React from 'react'
import HeaderLogo from './HeaderLogo'
import './index.scss'

const Header = ({children}) => <header>
    <HeaderLogo/>{children}
</header>;

export default Header;