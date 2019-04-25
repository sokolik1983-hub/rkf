import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import Form from 'apps/Registration/components/Form'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    registerUser,
    clearRequestErrors,
} from 'apps/Registration/actions'

import {registrationFormPhysicalPerson} from 'apps/Registration/config'

class Register extends PureComponent {
    fomSubmit = (values, {...other}) => {
        this.props.registerUser(values)
    };

    render() {
        return this.props.isAuthenticated ?
            <Redirect to="/"/>
            :
            (
                <Form
                    requestErrors={this.props.requestErrors}
                    clearRequestErrors={this.props.clearRequestErrors}
                    formSubmit={this.fomSubmit}
                    fields={registrationFormPhysicalPerson.fields}
                    validationSchema={registrationFormPhysicalPerson.validationSchema}
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
    registerUser,
    clearRequestErrors,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)