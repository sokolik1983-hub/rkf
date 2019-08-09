import React, {useEffect} from "react"
import {compose} from "redux";
import {Route, Switch} from 'react-router-dom'
import AuthOrLogin from 'apps/Auth/containers/AuthOrLogin'

import ClientExhibitions from 'apps/ClientExhibitions'
import ClientProfile from 'apps/ClientProfile'

import Home from './components/Home'
import ClientLayout from './components/Layout'

import {
    defaultReduxKey,
    ClientPathContext,
    clubInfoUrl,
} from "./config";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import {connectClientProxy} from './connectors'
import {useResourceAndStoreToRedux} from "../../shared/hooks";


function ClientProxy(props) {
    const {match, getClubInfoSuccess} = props;
    const {path} = match;

    useEffect(() => {
        // Add class on mount
        const wrap = document.getElementById("wrap");
        wrap.classList.add('client_layout');

        return (
            // Remove on Unmount
            () => wrap.classList.remove('client_layout')
        )

    }, []);

    const {loading} = useResourceAndStoreToRedux(clubInfoUrl, getClubInfoSuccess);

    return (
        <ClientPathContext.Provider value={{path}}>
            <AuthOrLogin>
                <ClientLayout>
                    <Switch>
                        <Route exact path={`${path}`} component={Home}/>
                        <Route path={`${path}/profile`} component={ClientProfile}/>
                        <Route path={`${path}/exhibitions`} component={ClientExhibitions}/>
                    </Switch>
                </ClientLayout>
            </AuthOrLogin>
        </ClientPathContext.Provider>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
    connectClientProxy,
)(ClientProxy)