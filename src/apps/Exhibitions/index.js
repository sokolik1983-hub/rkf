import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators, compose} from "redux"
import {Route, Switch} from 'react-router-dom'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";

import Details from './containers/Details'
import ExhibitionsListView from './containers/ListView'

import {
    fetchExhibitions
} from './actions'

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'



class ExhibitionsProxy extends Component {
    state = {
        path: this.props.match.path
    };

    componentDidMount() {
        this.props.fetchExhibitions();
    }

    render() {

        return (
            <ExhibitionsPathContext.Provider value={{path: this.state.path}}>
                <Switch>
                    <Route path={`${this.state.path}/:id/details`} component={Details}/>
                    <Route exact path={this.state.path} component={ExhibitionsListView}/>
                </Switch>
            </ExhibitionsPathContext.Provider>
        );
    }
}


const withReducer = injectReducer({key: 'exhibitions', reducer: reducer});
const withSaga = injectSaga({key: 'exhibitions', saga});


const mapDispatchToProps = dispatch => bindActionCreators({
    fetchExhibitions,
}, dispatch);

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(ExhibitionsProxy)