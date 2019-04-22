import React from 'react'
import HeaderLogo from './HeaderLogo'
import Container from 'components/Layout/Container'
import Nav from 'components/Nav'

import WidgetLang from 'components/WidgetLang'
import WidgetNotifications from 'components/WidgetNotifications'
import WidgetLogin from 'components/WidgetLogin'
import './index.scss'

const Header = ({children}) =>
    <header>
        <Container pad>
            <HeaderLogo/>
            <Nav/>
            <WidgetLang/>
            <WidgetNotifications/>
            <WidgetLogin/>
        </Container>
    </header>;


export default Header;