import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {scheduleDayForm} from 'apps/ClientExhibitionSchedule/config'
const {fields} = scheduleDayForm;

class ScheduleDayForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="schedule-day-form">
                <FormGroup inline>
                    <FormField
                        {...fields.date}
                    />

                    <div className="form-controls">
                        <Button loading={loading} type="submit" className="btn-primary btn-lg">Добавить</Button>
                    </div>
                </FormGroup>

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
)(ScheduleDayForm);