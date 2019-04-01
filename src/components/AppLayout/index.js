import React, {Fragment} from 'react'
import Nav from 'components/Nav'

const AppLayout = ({children}) => {
    return (
        <Fragment>
            <header>
                <Nav/>
            </header>
            <div className="main-content">
                {children}
            </div>
        </Fragment>
    )
};

export default AppLayout;

