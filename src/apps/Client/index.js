import React, {useEffect} from "react"
import {compose} from "redux";
import {Route, Switch} from 'react-router-dom'
import {useWrapClassName} from 'shared/hooks'
import AuthOrLogin from 'apps/Auth/containers/AuthOrLogin'
import ClientClub from 'apps/ClientClub'
import ClientExhibitions from 'apps/ClientExhibitions'
import ClientProfile from 'apps/ClientProfile'
import Messages from 'apps/Messages'
import ClientLayout from './components/Layout'

import {ClientCommonContext} from "./config";
import {connectClientProxy} from './connectors'


function ClientProxy(props) {
    const {match, profile_id} = props;
    const {path} = match;

    useWrapClassName('client_club');

    return (
        <ClientCommonContext.Provider value={{path, profile_id}}>
            <AuthOrLogin>
                <ClientLayout>



                    <Switch>

                        <Route path={`${path}/profile`} component={ClientProfile}/>
                        <Route path={`${path}/exhibitions`} component={ClientExhibitions}/>
                        <Route path={`${path}`} component={ClientClub}/>
                    </Switch>
                    <Messages/>
                </ClientLayout>
            </AuthOrLogin>
            }

        </ClientCommonContext.Provider>
    )
}

export default compose(
    connectClientProxy,
)(ClientProxy)