import React from "react"
import {compose} from "redux"
import {Route, Switch} from 'react-router-dom'
import {getPathFromRouterParams} from 'utils/index'
import Container from 'components/Layout/Container'
import reducer from './reducer'
import PublicLayout from 'components/Layout'
import Details2 from './containers/Details'
import Details from './components/Details'
import ExhibitionsList from './components/List'
import ListExhibitionsByDates from './components/ListByDates'
import {defaultReduxKey} from "./config";

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'
import injectReducer from "utils/injectReducer";


function ExhibitionsProxy(props) {

    const path = getPathFromRouterParams(props);
    return (
        <ExhibitionsPathContext.Provider value={{path}}>
            <PublicLayout>
                <Container pad content>

                    <Switch>
                        <Route path={`${path}/:id/details2`} component={Details2}/>
                        <Route path={`${path}/:id/details`} component={Details}/>
                        <Route exact path={path} component={ListExhibitionsByDates}/>
                    </Switch>

                </Container>
            </PublicLayout>
        </ExhibitionsPathContext.Provider>
    );

}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});


export default compose(
    withReducer,
)(ExhibitionsProxy)