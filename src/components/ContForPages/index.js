import React, {useState} from "react";
import Header from "../Layouts/Header";
import Layout from "../Layouts";
import {compose} from "redux";
import injectReducer from "../../utils/injectReducer";
import reducer from "../Layouts/reducer";


const ContForPages= ({ children, withFilters, showCopyright, login_page, setNotificationsLength }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Header withFilters={withFilters} login_page={login_page} setNotificationsLength={setNotificationsLength} setIsOpen={setIsOpen} isOpen={isOpen}/>
            <Layout withFilters={withFilters} children={children} login_page={login_page} setNotificationsLength={setNotificationsLength} />
        </>
    )
};

const withReducer = injectReducer({ key: 'contforpages', reducer: reducer });

export default compose(withReducer)(React.memo(ContForPages));