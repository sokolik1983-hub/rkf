import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import Login from './components/Login'
import {redirectAfterLogin} from "./config";

class AuthorizationProxy extends Component {
    render() {
        return this.props.isAuthenticated ?
            <Redirect to={this.props.isActiveProfile ? redirectAfterLogin : '/client'}/>
            :
            <Login/>
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isActiveProfile: state.authentication.is_active_profile
});
export default connect(mapStateToProps)(AuthorizationProxy)