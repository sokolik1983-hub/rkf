import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import Form from 'apps/Registration/components/Form'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {registrationSuccessPath} from 'apps/Registration/config'
import {
    registerUser,
    clearRequestErrors,
} from 'apps/Registration/actions'


class Register extends PureComponent {
    fomSubmit = (values, {...other}) => {
        this.props.registerUser(values)
    };

    render() {
        const {
            loading,
            fields,
            validationSchema,
            registrationComplete,
            requestErrors,
            clearRequestErrors,
            children
        } = this.props;

        return registrationComplete ?
            <Redirect to={registrationSuccessPath}/>
            :
            (
                <Form
                    loading={loading}
                    requestErrors={requestErrors}
                    clearRequestErrors={clearRequestErrors}
                    formSubmit={this.fomSubmit}
                    fields={fields}
                    validationSchema={validationSchema}
                >
                    {children}
                </Form>
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