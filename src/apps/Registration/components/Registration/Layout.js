import React from 'react';
import './style.scss';

const Layout = ({ children, title }) => {
    return (
        <div className="Registration">
            <div className="Registration__image"></div>
            <div className="Registration__content">
                <div className="registration__logo" />
                <div className="registration__title">{title}</div>
                {children}
            </div>
        </div>
    )
}

export default Layout;