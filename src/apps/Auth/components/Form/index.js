import React, {PureComponent} from 'react'
//import {Link} from 'react-router-dom'

import Form from 'components/Form/Form'
import FormGroup from "components/Form/FormGroup";
import FormField from "components/Form/Field";
import FormInput from "components/Form/FormInput";

import {loginFormConfig} from 'apps/Auth/config'

const {fields} = loginFormConfig;

class LoginForm extends PureComponent {
    render() {
        return (
            <Form
                {...loginFormConfig}
            >
                <FormGroup>
                    <FormField
                        {...fields.email}
                    />
                    <FormField
                        {...fields.password}
                    />
                </FormGroup>
                <FormGroup className="login-form__holder" inline>
                    <FormInput checkbox>
                        <label>Запомнить меня</label>
                        <input type="checkbox" className="FormInput__input"/>
                    </FormInput>
                    {/* <div style={{marginLeft: 'auto'}}><Link className="no-ul" to="/auth/login/restore">Забыли
                        пароль</Link></div> */}
                </FormGroup>
            </Form>
        )
    }
}


export default LoginForm