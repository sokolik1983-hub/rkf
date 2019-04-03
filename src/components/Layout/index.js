import React, {Fragment} from 'react'
import Header from 'components/Layout/Header'
import Nav from 'components/Nav'

const AppLayout = ({children}) => {
    return (
        <Fragment>
            <Header>
                <Nav/>
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

