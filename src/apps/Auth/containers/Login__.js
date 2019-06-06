import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import Form from 'apps/Auth/components/Form'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    loginUserSuccess,
} from 'apps/Auth/actions'

import {loginForm} from 'apps/Auth/config'
import {Req} from "utils/request";
import {SERVER} from "appConfig";
import {LOGIN} from "../api";


class Login extends PureComponent {
    fomSubmit = (values, {...other}) => {
        Req.post(
            {
                url: SERVER + LOGIN,
                data: values
            }
        ).then(
            data => {
                this.props.loginUserSuccess(JSON.parse(data))
            },
            errors => {
                other.setSubmitting(false);
                try {
                    other.setErrors(JSON.parse(errors.response))
                } catch (e) {
                    other.setStatus({msg: errors.response});
                }

            }
        );
    };

    render() {
        const {loading, isAuthenticated} = this.props;
        return isAuthenticated ?
            <Redirect to="/"/>
            :
            (
                <Form
                    loading={loading}
                    formSubmit={this.fomSubmit}
                    fields={loginForm.fields}
                    validationSchema={loginForm.validationSchema}
                />
            )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUserSuccess,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)