import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import Form from 'apps/Registration/components/Form'
import FormLegalEntity from 'apps/Registration/components/FormLegalEntity'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    registerUser,
    clearRequestErrors,
} from 'apps/Registration/actions'

import {
    registrationFormPhysicalPerson,
    registrationFormLegalEntity,
} from 'apps/Registration/config'

class Register extends PureComponent {
    fomSubmit = (values, {...other}) => {
        this.props.registerUser(values)
    };

    render() {
        const RegistrationForm = this.props.legal ?
            FormLegalEntity
            :
            Form
        const formFields = this.props.legal?
            registrationFormLegalEntity
            :
            registrationFormPhysicalPerson
        return this.props.registrationComplete ?
            <Redirect to="/"/>
            :
            (
                <RegistrationForm
                    requestErrors={this.props.requestErrors}
                    clearRequestErrors={this.props.clearRequestErrors}
                    formSubmit={this.fomSubmit}
                    fields={formFields.fields}
                    validationSchema={formFields.validationSchema}
                />
            )
    }
}

const mapStateToProps = state => ({
    loading: state.registration.loading,
    registrationComplete: state.registration.registrationComplete,
    requestErrors: state.registration.requestErrors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    registerUser,
    clearRequestErrors,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)