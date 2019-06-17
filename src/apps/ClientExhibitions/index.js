import React, {PureComponent} from "react"
import {compose} from "redux";
import {Route, Switch} from 'react-router-dom'

import ExhibitionCreate from './components/Create'
import ExhibitionDetails from './containers/Details'
import ExhibitionList from './containers/List'

import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import injectSaga from "utils/injectSaga";
import saga from "./saga";

import {ClientExhibitionsPathContext} from './context'
import {defaultReduxKey} from "./config";



class ClientExhibitionsProxy extends PureComponent {
    render() {
        const {path} = this.props.match;
        return (
            <ClientExhibitionsPathContext.Provider value={{path}}>
                <Switch>
                    <Route exact path={`${path}`} component={ExhibitionList}/>
                    <Route path={`${path}/add`} component={ExhibitionCreate}/>
                    <Route path={`${path}/:id/details`} component={ExhibitionDetails}/>
                </Switch>
            </ClientExhibitionsPathContext.Provider>
        );
    }
}


const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
const withSaga = injectSaga({key: defaultReduxKey, saga});

export default compose(
    withReducer,
    withSaga)(ClientExhibitionsProxy)