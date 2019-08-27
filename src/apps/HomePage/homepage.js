import React from "react";
import {compose} from "redux";
import HomePageLayout from 'apps/HomePage/components/HomepageLayout'
import injectReducer from 'utils/injectReducer'
import {defaultReduxKey} from './config'
import reducer from './reducer'
import {ClubRouteContext} from './context'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {connectClubCommon} from './connectors'



function HomePageProxy({match, getCommonSuccess}) {
    const {params} = match;
    //TODO Make better
    const {route} = params;
    const url = route ? '/api/Club/public/' + route : '/api/Club/public/rkf';
    const {loading} = useResourceAndStoreToRedux(url, getCommonSuccess);
    return (
        <ClubRouteContext.Provider value={{params}}>
            {loading ? 'загрузка...' : null}
            <HomePageLayout/>
        </ClubRouteContext.Provider>
    );
}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});


export default compose(
    withReducer,
    connectClubCommon
)(HomePageProxy)