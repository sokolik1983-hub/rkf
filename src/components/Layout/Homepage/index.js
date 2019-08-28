import React, { Fragment, useState, useEffect } from 'react'
import Header from 'components/Layout/Header'


import './index.scss'

const Slider = () => <div className="homepage Slider"></div>

const PublicLayout = ({ children }) => {
    const [scrollY, setScrollY] = useState(window.scrollY);
    useEffect(
        () => {
            const handleScroll = () => setScrollY(window.scrollY);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    );
    return (
        <Fragment>
            <Header className={`homepage ${scrollY > 677 ? 'white-bg' : ''}`} />
            <Slider />
            {children}
        </Fragment>
    )
};

export default PublicLayout;