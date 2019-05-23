import React, {PureComponent} from 'react'
import FormField from 'components/Form/Field'
import {withFormik, Form} from 'formik';
import Button from "components/Button";
import FormGroup from 'components/Form/FormGroup'

import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {firstStepForm} from 'apps/ClientExhibitions/config'

const {fields} = firstStepForm;

class FirstStepFormFields extends PureComponent {

    componentDidUpdate() {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="registration-form">

                <FormField
                    {...fields.exhibition_name}
                />
                <FormField
                    {...fields.exhibition_description}
                />

                <FormGroup inline>
                    <FormField
                        {...fields.rank_type}
                    />

                    <FormField
                        {...fields.dignity_types}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.exhibition_class}
                    />
                    <FormField
                        {...fields.breed_types}
                    />
                </FormGroup>
                <FormField
                    {...fields.exhibition_city}
                />
                <FormField
                    {...fields.exhibition_address}
                />


                <div className="form-controls">
                    <Button loading={loading} type="submit" className="btn-primary btn-lg">Продолжить</Button>
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
        validationSchema: props => props.validationSchema,
        handleSubmit: (values, {props, ...other}) => props.formSubmit(values, {...other}),
        displayName: props => props.displayName, // helps with React DevTools
    }
)(FirstStepFormFields);