import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";

import {getFormInitialValues, processRequestErrors} from 'components/Form/services'


class RegistrationForm extends PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {fields} = this.props;
        return (
            <Form className="registration-form">
                <FormField
                    {...fields.registration_type}
                />
                <FormGroup inline>
                    <FormField
                        {...fields.company_name}
                    />
                    <FormField
                        {...fields.company_type}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.email}
                    />
                    <FormField
                        {...fields.password}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.phone_number}
                    />
                    <FormField
                        {...fields.submit_phone_code}
                    />
                </FormGroup>

                <div className="form-controls">
                    <Button type="submit" className="btn-primary btn-lg">Зарегистрироваться</Button>
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