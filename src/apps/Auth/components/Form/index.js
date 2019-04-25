import React, {PureComponent} from 'react'
import {withFormik, Form} from 'formik';
import FormField from 'components/Form/Field'
import FormGroup from "components/Form/FormGroup";
import Button from "components/Button";
import FormInput from "components/Form/Field/FormInput";
import {getFormInitialValues, processRequestErrors} from 'components/Form/services'
import {Link} from "react-router-dom";

import './styles.scss'

class LoginForm extends PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        processRequestErrors(this.props)
    }

    render() {
        const {fields} = this.props;
        return (
            <Form className="login-form">
                <FormGroup>
                    <FormField
                        {...fields.phone_number}
                    />
                    <FormField
                        {...fields.password}
                    />
                </FormGroup>
                <FormGroup className="login-form__holder" inline>
                    <FormInput checkbox>
                        <label>Запомнить меня</label>
                        <input type="checkbox" className="form-input__input"/>
                    </FormInput>
                    <div style={{marginLeft:'auto'}}><Link  className="no-ul" to="/auth/login/restore">Забыли пароль</Link></div>
                </FormGroup>
                <div className="form-controls">
                    <Button type="submit" className="btn-primary btn-lg">Войти</Button>
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
)(LoginForm);