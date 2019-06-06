import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {scheduleDayItemForm} from 'apps/ClientExhibitionSchedule/config'
import {BtnPus} from 'components/Svg'
import './styles.scss'

const {fields, validationSchema} = scheduleDayItemForm;

class ScheduleDayItemForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="schedule-day-item-form">
                <FormGroup inline>
                    <FormField
                        className={'start'}
                        {...fields.time_start}
                    />
                    <FormField
                        {...fields.time_end}
                    />
                    <FormField
                        style={{flex: 2}}
                        {...fields.name}
                    />
                    <div className="form-controls">
                        <Button leftIcon={<BtnPus/>} loading={loading} type="submit"
                                className="btn-simple btn-lg">Добавить</Button>
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
        validationSchema: validationSchema,
        handleSubmit: (values, {props, ...other}) => props.formSubmit(values, {...other}),
        displayName: props => props.displayName, // helps with React DevTools
    }
)(ScheduleDayItemForm);