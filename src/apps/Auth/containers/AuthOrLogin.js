import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LOGIN_URL} from 'appConfig'
import Login from 'apps/Auth/components/Login'

const AuthOrLogin = ({children, isAuthenticated, redirect}) =>
    isAuthenticated ?
        children
        :
        redirect ?
            <Redirect to={LOGIN_URL}/> :
            <Login/>;

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
});

export default connect(
    mapStateToProps,
)(AuthOrLogin)
