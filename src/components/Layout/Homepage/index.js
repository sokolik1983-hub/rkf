import React, { Fragment, useState } from 'react'
import Header from 'components/Layout/Header'


import './index.scss'

const Slider = () => <div className="homepage Slider"></div>

const PublicLayout = ({ children }) => {
    const [whiteBg, setWhiteBg] = useState(false);
    window.onscroll = () => setWhiteBg(window.pageYOffset > 677 ? true : false);

    return (
        <Fragment>
            <Header className={`homepage ${whiteBg ? 'white-bg' : ''}`} />
            <Slider />
            {children}
        </Fragment>
    )
};

export default PublicLayout;