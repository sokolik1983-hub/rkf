import React from "react";
import { compose } from "redux";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import './index.scss';


const Layout = ({ children, withFilters, showCopyright, login_page, setNotificationsLength }) => (
    <>
        <Header withFilters={withFilters} login_page={login_page} setNotificationsLength={setNotificationsLength} />
        {children}
        {!login_page && <Footer showCopyright={showCopyright} />}
    </>
);

const withReducer = injectReducer({ key: 'layout', reducer: reducer });

export default compose(withReducer)(React.memo(Layout));