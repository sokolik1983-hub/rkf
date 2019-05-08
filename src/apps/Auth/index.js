import React, {Component} from "react";
import {compose} from "redux";
import AuthorizationLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import injectSaga from 'utils/injectSaga'
import saga from "./saga";


class Authorization extends Component {

    render() {
        const {path} = this.props.match;
        return <Switch>
            <Route path={`${path}`} component={AuthorizationLayout}/>
        </Switch>
    }
}


const withSaga = injectSaga({key: 'authorization', saga});


export default compose(
    withSaga,
)(Authorization)