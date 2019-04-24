import React, {Component} from "react";
import {compose} from "redux";
import AuthorizationLayout from './components/Layout'
import injectSaga from 'utils/injectSaga'
import saga from "./saga";


class Authorization extends Component {

    render() {
        return <AuthorizationLayout/>
    }
}





const withSaga = injectSaga({key: 'authentication', saga});


export default compose(
    withSaga,
    )(Authorization)