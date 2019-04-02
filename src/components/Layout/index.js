import React, {Fragment} from 'react'
import Header from 'components/Layout/Header'
import Nav from 'components/Nav'
import WidgetLang from 'components/WidgetLang'
import WidgetNotifications from 'components/WidgetNotifications'
import WidgetLogin from 'components/WidgetLogin'
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
            <aside>
                left aside block
            </aside>
            <div className="main-content">
                {children}
            </div>
        </Fragment>
    )
};

export default AppLayout;