import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

//import Form from 'apps/Auth/components/Form'
import SubmitButton from 'components/Form/SubmitButton'
import Form from 'components/Form/Form'
import FormGroup from "components/Form/FormGroup";
import FormField from "components/Form/Field";
import FormInput from "components/Form/FormInput";

import {loginFormConfig} from 'apps/Auth/config'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loginUserSuccess} from 'apps/Auth/actions'
const {fields} = loginFormConfig;

class LoginForm extends PureComponent {
    render() {
        return (
            <Form
                successAction={this.props.loginUserSuccess}
                {...loginFormConfig}
            >
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
                    <div style={{marginLeft: 'auto'}}><Link className="no-ul" to="/auth/login/restore">Забыли
                        пароль</Link></div>
                </FormGroup>
                <div className="form-controls">
                    <SubmitButton className="btn-primary btn-lg">Войти</SubmitButton>
                </div>
            </Form>
        )
    }
}

const mapsDispatchToProps=dispatch=>bindActionCreators({loginUserSuccess},dispatch)
export default connect(null, mapsDispatchToProps())(LoginForm)