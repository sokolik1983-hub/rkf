import React from 'react'
import HeaderLogo from './HeaderLogo'
import Container from 'components/Layout/Container'
import Nav from 'components/Nav'
import CitySelect from 'components/CitySelect'

import WidgetLang from 'components/WidgetLang'
import WidgetNotifications from 'components/WidgetNotifications'
import HeaderLogin from 'apps/Auth/containers/HeaderLogin'
import './index.scss'

const Header = ({ children }) =>
    <header>
        <Container pad>
<<<<<<< HEAD
            <HeaderLogo />
            <Nav />
            <CitySelect />
            <WidgetLang />
            <WidgetNotifications />
            <HeaderLogin />
=======
            <HeaderLogo/>
            <Nav/>
            {/*<WidgetLang/>*/}
            {/*<WidgetNotifications/>*/}
            <HeaderLogin/>
>>>>>>> 12386d998087b915a419998e598911c0fbf7e74f
        </Container>
    </header>


export default Header;