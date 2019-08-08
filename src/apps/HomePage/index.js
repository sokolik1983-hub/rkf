import React from "react";
import {compose} from "redux";
import HomePageLayout from 'apps/HomePage/components/Layout'
import injectReducer from 'utils/injectReducer'
import {defaultReduxKey} from './config'
import reducer from './reducer'


function HomePageProxy() {
    return (
        <HomePageLayout/>
    );
}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});


export default compose(
    withReducer
)(HomePageProxy)