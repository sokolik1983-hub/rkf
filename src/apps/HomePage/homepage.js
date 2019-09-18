import React from "react";
import {compose} from "redux";
import RkfHomepageLayout from 'apps/HomePage/components/RkfHomepageLayout'
import injectReducer from 'utils/injectReducer'
import {defaultReduxKey} from './config'
import reducer from './reducer'
import {ClubRouteContext} from './context'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {connectClubCommon} from './connectors'



function RkfHomePageProxy({match, getCommonSuccess}) {
    const {params} = match;
    //TODO Make better
    const {route} = params;
    const url = route ? '/api/Club/public/' + route : '/api/Club/public/rkf';
    useResourceAndStoreToRedux(url, getCommonSuccess);
    return (
        <ClubRouteContext.Provider value={{params}}>
            <RkfHomepageLayout/>
        </ClubRouteContext.Provider>
    );
}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});


export default compose(
    withReducer,
    connectClubCommon
)(RkfHomePageProxy)