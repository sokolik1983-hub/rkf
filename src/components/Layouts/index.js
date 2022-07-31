import React, {useEffect} from "react";
import {compose} from "redux";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import {connectShowFilters} from "./connectors";
import "./index.scss";


const Layout = (props) => {
    const {children, login_page, setShowFilters, layoutWithFilters} = props;

    useEffect(() => {
        setShowFilters({withFilters: layoutWithFilters, login_page: login_page, isOpen: false});
    }, []);

    return (
        <>
            {children}
        </>
    )
};

const withReducer = injectReducer({key: 'layout', reducer: reducer});

export default compose(withReducer)(React.memo(connectShowFilters(Layout)));