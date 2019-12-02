import React from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import './index.scss';

const Layout = ({children}) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export default Layout;