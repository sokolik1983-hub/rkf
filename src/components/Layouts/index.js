import React from "react";
import { compose } from "redux";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import './index.scss';


const Layout = ({ children, withFilters, showCopyright }) => (
    <>
        <Header withFilters={withFilters} />
        {children}
        <Footer showCopyright={showCopyright} />
    </>
);

const withReducer = injectReducer({ key: 'layout', reducer: reducer });

export default compose(withReducer)(React.memo(Layout));