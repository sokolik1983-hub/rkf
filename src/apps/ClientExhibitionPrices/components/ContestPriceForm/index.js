import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {exhibitionPricesForm} from 'apps/ClientExhibitionPrices/config'
import {BtnPus} from 'components/Svg'
import './styles.scss'

const {fields, validationSchema} = exhibitionPricesForm;

class ScheduleDayItemForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="schedule-day-item-form">
                <FormGroup  inline>
                    <FormField
                        style={{flex:1}}
                        className={'start'}
                        {...fields.price1}
                    />
                </FormGroup>
                <FormGroup style={{justifyContent:'stretch'}} inline>

                    <FormField
                        style={{flex:1}}
                        {...fields.discount}
                    />
                    <FormField
                        style={{flex:1}}
                        {...fields.price2}
                    />
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