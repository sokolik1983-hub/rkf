import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

const Breadcrumbs = ({children}) =>
    <div className="breadcrumbs">
        <Link
            to="/"
            className="breadcrumbs__link breadcrumbs__link--home"
        />
        {children}
    </div>;

export default Breadcrumbs;