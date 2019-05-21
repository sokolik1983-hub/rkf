import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import Button from "components/Button";

import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import './styles.scss'

class RegistrationForm extends PureComponent {

    componentDidUpdate() {
        processRequestErrors(this.props)
    }

    render() {
        const {children, loading} = this.props;
        return (
            <Form className="registration-form">
                {children}

                <div className="form-controls">
                    <Button loading={loading} type="submit" className="btn-primary btn-lg">Зарегистрироваться</Button>
                </div>
            </Form>
        )
    }
}


export default withFormik(
    {
        mapPropsToValues: props => getFormInitialValues({
            fields: props.fields,
            formInitials: props.formInitials
        }),
        validationSchema: props => props.validationSchema,
        handleSubmit: (values, {props, ...other}) => props.formSubmit(values, {...other}),
        displayName: props => props.displayName, // helps with React DevTools
    }
)(RegistrationForm);