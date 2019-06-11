import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {exhibitionPricesForm} from 'apps/ClientExhibitionPrices/config'
import './styles.scss'

const {fields, validationSchema} = exhibitionPricesForm;

class ScheduleDayItemForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {loading} = this.props;
        return (
            <Form className="exhibition-price-form">
                <FormGroup style={{justifyContent: 'stretch'}} inline>

                    <FormField
                        style={{flex: 1}}
                        {...fields.discont}
                    />
                    <FormField
                        style={{flex: 1}}
                        className={'start'}
                        {...fields.sum}
                    />

                </FormGroup>
                <div className="form-controls"><Button loading={loading} className="btn-primary" type="submit">Применить</Button></div>
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