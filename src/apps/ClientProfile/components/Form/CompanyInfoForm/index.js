import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {clientProfileForm} from 'apps/ClientProfile/config'

const {fields, validationSchema} = clientProfileForm;

class CompanyInfoForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="schedule-day-form">
                <FormGroup>
                    <FormField
                        {...fields.name}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.federation}
                    />
                    <FormField
                        {...fields.status}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.company_region}
                    />
                    <FormField
                        {...fields.owner_name}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.company_date_egrul}
                    />
                    <FormField
                        {...fields.registration_date}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.iin}
                    />
                    <FormField
                        {...fields.kpp}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.ogrn}
                    />
                    <FormField
                        {...fields.okpo}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        {...fields.company_dog_stamp}
                    />
                </FormGroup>
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
)(CompanyInfoForm);