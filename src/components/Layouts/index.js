import React, {useState, useEffect} from "react";
import { compose } from "redux";
import Header from "../Layouts/Header";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import FooterMenu from "./FooterMenu";
import {connectShowFilters} from "./connectors";

import './index.scss';



const Layout = ({ children, withFilters, showCopyright, login_page, setShowFilters}) => {

    useEffect(() => {
        setShowFilters({ withFilters: withFilters, login_page: login_page, isOpen: false})
    }, [withFilters, login_page]);

    return (
        <>
            {children}
        </>
    )
};

const withReducer = injectReducer({ key: 'layout', reducer: reducer });

export default compose(withReducer)(React.memo(connectShowFilters(Layout)));