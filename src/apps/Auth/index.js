import React, {Component} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import Login from './components/Login'
import injectSaga from 'utils/injectSaga'
import saga from "./saga";


class AuthorizationProxy extends Component {
    render() {
        return this.props.isAuthenticated ?
            <Redirect to="/"/>
            :
            <Login/>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
});
const withConnect = connect(
    mapStateToProps,
);
const withSaga = injectSaga({key: 'authorization', saga});

export default compose(
    withConnect,
    withSaga,
)(AuthorizationProxy)