import React from "react";
import {compose} from "redux";
import HomePageLayout from 'apps/HomePage/components/ClubHomePageLayout'
import injectReducer from 'utils/injectReducer'
import {defaultReduxKey} from './config'
import reducer from './reducer'
import {ClubRouteContext} from './context'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {connectClubCommon} from './connectors'
import Loading from 'components/Loading';
import PageNotFound from "../../pages/404";
import ClubNotActive from "../../pages/Club/ClubNotActive";


function ClubHomePageProxy({match, clubCommon, getCommonSuccess}) {
    const {params} = match;
    const {route} = params;
    const url = route ? '/api/Club/public/' + route : '/api/Club/public/rkf';
    const {loading, requestError} = useResourceAndStoreToRedux(url, getCommonSuccess);

    return (
        loading ?
            <Loading /> :
            requestError ?
                requestError.status === 422 ?
                    <ClubNotActive/> :
                    <PageNotFound /> :
                <ClubRouteContext.Provider value={{
                    params,
                    clubCommon,
                }}>
                    {loading ? 'загрузка...' : null}
                    <HomePageLayout/>
                </ClubRouteContext.Provider>
    );
}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});


export default compose(
    withReducer,
    connectClubCommon
)(ClubHomePageProxy)