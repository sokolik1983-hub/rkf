import React, {useState, useEffect} from "react";
import { compose } from "redux";
import Header from "../Layouts/Header";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import FooterMenu from "./FooterMenu";
import {connectShowFilters} from "./connectors";

import './index.scss';



const Layout = ({ children, withFilters, showCopyright, login_page, setShowFilters, setNotificationsLength }) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log('2222222222', withFilters, login_page, isOpen)

    useEffect(() => {
        setShowFilters({ withFilters: withFilters, login_page: login_page, isOpen: isOpen})
    }, [isOpen,withFilters, login_page]);

    return (
        <>
            <Header withFilters={withFilters} login_page={login_page} setNotificationsLength={setNotificationsLength} setIsOpen={setIsOpen} isOpen={isOpen}/>
            {children}
            <FooterMenu login_page={login_page} setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
};

const withReducer = injectReducer({ key: 'layout', reducer: reducer });

export default compose(withReducer)(React.memo(connectShowFilters(Layout)));