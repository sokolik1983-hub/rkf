import React from "react"
import {compose} from "redux"
import {Route, Switch} from 'react-router-dom'
import {getPathFromRouterParams} from 'utils/index'
import {createDefaultInjectors} from "utils/createInjectors";
import Container from 'components/Layout/Container'
import reducer from './reducer'
import saga from "./saga";
import PublicLayout from 'components/Layout'
import Details from './containers/Details'
import Details2 from './components/Details'
import ExhibitionsList from './components/List'
import {defaultReduxKey} from "./config";

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'


function ExhibitionsProxy(props) {

    const path = getPathFromRouterParams(props);
    return (
        <ExhibitionsPathContext.Provider value={{path}}>
            <PublicLayout>
                <Container pad content>

                    <Switch>
                        <Route path={`${path}/:id/details2`} component={Details}/>
                        <Route path={`${path}/:id/details`} component={Details2}/>
                        <Route exact path={path} component={ExhibitionsList}/>
                    </Switch>

                </Container>
            </PublicLayout>
        </ExhibitionsPathContext.Provider>
    );

}


const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});


export default compose(
    withReducer,
    withSaga,
)(ExhibitionsProxy)