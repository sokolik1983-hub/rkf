import React from 'react'
import HeaderLogo from './HeaderLogo'
import Container from 'components/Layout/Container'
import Nav from 'components/Nav'
import CitySelect from 'components/CitySelect'

import WidgetLang from 'components/WidgetLang'
import WidgetNotifications from 'components/WidgetNotifications'
import HeaderLogin from 'apps/Auth/containers/HeaderLogin'
import './index.scss'

const Header = ({ children, className }) =>
    <header className={className} >
        <Container pad>
            <HeaderLogo />
            <CitySelect />
            <Nav />

            {/*<WidgetLang/>*/}
            {/*<WidgetNotifications/>*/}
            <HeaderLogin />

        </Container>
    </header>


export default Header;