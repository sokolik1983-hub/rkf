import React, {Fragment} from 'react'
import Calendar from 'apps/Exhibitions/componentns/Calendar'
import Header from 'components/Layout/Header'
import Aside from 'components/Layout/Aside'
import Content from 'components/Layout/Content'
import Container from 'components/Layout/Container'

import './index.scss'



const AppLayout = ({children}) => {
    return (
        <Fragment>
            <Header>
                <Nav/>
                <WidgetLang/>
                <WidgetNotifications/>
                <WidgetLogin/>
            </Header>
            <Container>
                <Aside>
                    <Calendar/>
                </Aside>
                <Content>
                    {children}
                </Content>
            </Container>
        </Fragment>
    )
};

export default AppLayout;