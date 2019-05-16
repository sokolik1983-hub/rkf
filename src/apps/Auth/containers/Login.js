import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import Form from 'apps/Auth/components/Form'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    loginUser,
    clearRequestErrors,
} from 'apps/Auth/actions'

import {loginForm} from 'apps/Auth/config'

class Login extends PureComponent {
    fomSubmit = (values, {...other}) => {
        this.props.loginUser(values)
    };

    render() {
        const {loading, isAuthenticated}=this.props;
        return isAuthenticated ?
            <Redirect to="/"/>
            :
            (
                <Form
                    loading={loading}
                    requestErrors={this.props.requestErrors}
                    clearRequestErrors={this.props.clearRequestErrors}
                    formSubmit={this.fomSubmit}
                    fields={loginForm.fields}
                    validationSchema={loginForm.validationSchema}
                />
            )
    }
}

const mapStateToProps = state => ({
    loading: state.authentication.loading,
    isAuthenticated: state.authentication.isAuthenticated,
    requestErrors: state.authentication.requestErrors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser,
    clearRequestErrors,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)