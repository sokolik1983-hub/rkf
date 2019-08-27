import React, { Fragment } from 'react'
import Header from 'components/Layout/Header'


import './index.scss'

const Slider = () => <div className="homepage Slider"></div>

const PublicLayout = ({ children }) => {
    return (
        <Fragment>
            <Header className="homepage" />
            <Slider />
            {children}
        </Fragment>
    )
};

export default PublicLayout;