import React, {Fragment} from 'react'
import Header from 'components/Layout/Header'
//import Footer from 'components/Layout/Footer'


import './index.scss'


const PublicLayout = ({children}) => {
    return (
        <Fragment>
            <Header/>
                {children}
            {/*<Footer/>*/}
        </Fragment>
    )
};

export default PublicLayout;