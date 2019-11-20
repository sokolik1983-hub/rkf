import React from 'react';
import HeaderLogo from './HeaderLogo';
import Container from 'components/Layout/Container';
import Nav from 'components/Nav';
//import CitySelect from 'components/CitySelect';

//import WidgetLang from 'components/WidgetLang'
//import WidgetNotifications from 'components/WidgetNotifications'
import WidgetLogin from 'apps/Auth/components/WidgetLogin';
import './index.scss';

const Header = ({ children, className }) => (
    <header className={className}>
        <Container pad>
            <HeaderLogo />
            {/* <CitySelect /> */}
            <Nav />

            {/*<WidgetLang/>*/}
            {/*<WidgetNotifications/>*/}
            <WidgetLogin />
        </Container>
    </header>
);

export default Header;
