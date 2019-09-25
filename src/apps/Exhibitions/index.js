import React from "react"
import {compose} from "redux"
import {Route, Switch} from 'react-router-dom'
import {getPathFromRouterParams} from 'utils/index'
import reducer from './reducer'
import PublicLayout from 'components/Layout'
import Details from './components/Details'
import ExhibitionsList from './components/List'

import {defaultReduxKey} from "./config";

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'
import injectReducer from "utils/injectReducer";


function ExhibitionsProxy(props) {

    const path = getPathFromRouterParams(props);
    return (
        <ExhibitionsPathContext.Provider value={{path}}>
            <PublicLayout>
                <Switch>
                    <Route path={`${path}/:id/details`} component={Details}/>
                    <Route exact path={path} component={ExhibitionsList}/>
                </Switch>
            </PublicLayout>
        </ExhibitionsPathContext.Provider>
    );

}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});


export default compose(
    withReducer,
)(ExhibitionsProxy)