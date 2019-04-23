import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import AuthorizationLayout from './components/Layout'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";

import {
    loginUser
} from 'apps/Auth/actions'



class Authorization extends Component {

    render() {
        return <AuthorizationLayout/>
    }
}




const withReducer = injectReducer({key: 'registration', reducer: reducer});
const withSaga = injectSaga({key: 'registration', saga});

const mapStateToProps = state => state.demo;

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(Authorization)