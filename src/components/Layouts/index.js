import React, {useState} from "react";
import { compose } from "redux";
import Header from "../Layouts/Header";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import FooterMenu from "./FooterMenu";

import './index.scss';



const Layout = ({ children, withFilters, showCopyright, login_page, setNotificationsLength }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Header withFilters={withFilters} login_page={login_page} setNotificationsLength={setNotificationsLength} setIsOpen={setIsOpen} isOpen={isOpen}/>
                {children}
                <FooterMenu login_page={login_page} setIsOpen={setIsOpen} isOpen={isOpen}/>
            </>
        )
    };

const withReducer = injectReducer({ key: 'layout', reducer: reducer });

export default compose(withReducer)(React.memo(Layout));