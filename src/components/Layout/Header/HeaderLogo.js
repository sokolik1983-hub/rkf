import React from 'react'
import {Link} from 'react-router-dom'
const SRC = '/static/images/header/rkf-logo.svg'

const HeaderLogo = () => <Link to="/" className="header__logo"><img src={SRC} alt="logo"/></Link>;

export default HeaderLogo;