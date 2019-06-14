import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {clientSocialForm} from 'apps/ClientProfile/config'

const {fields, validationSchema} = clientSocialForm;

class CompanySocialForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="schedule-day-form">

                <FormField
                    {...fields.web_site}
                />
                <FormField
                    {...fields.facebook}
                />

                <FormField
                    {...fields.vk}
                />
                <FormField
                    {...fields.instagram}
                />

                <div className="form-controls">
                    <Button loading={loading} type="submit" className="btn-primary btn-lg">Добавить</Button>
                </div>
            </Form>
        )
    }
}


export default withFormik(
    {
        mapPropsToValues: props => getFormInitialValues({
            fields: fields,
            formInitials: props.formInitials
        }),
        validationSchema: validationSchema,
        handleSubmit: (values, {props, ...other}) => props.formSubmit(values, {...other}),
        displayName: props => props.displayName, // helps with React DevTools
    }
)(CompanySocialForm);