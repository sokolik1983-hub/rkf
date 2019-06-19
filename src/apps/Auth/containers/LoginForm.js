import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    FormFormikEnhanced,
    SubmitButton,
    FormGroup,
    FormField,
    FormInput,
} from 'components/Form'


import {loginFormConfig} from 'apps/Auth/config'

import {loginUserSuccess} from 'apps/Auth/actions'

const {fields} = loginFormConfig;
console.log('fields', fields)
class LoginForm extends PureComponent {
    render() {
        console.log(fields)
        return (
            <FormFormikEnhanced
                onSuccess={this.props.loginUserSuccess}
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
                        <input type="checkbox" className="formInput__input"/>
                    </FormInput>
                    <div style={{marginLeft: 'auto'}}><Link className="no-ul" to="/auth/login/restore">Забыли
                        пароль</Link></div>
                </FormGroup>
                <div className="form-controls">
                    <SubmitButton className="btn-primary btn-lg">Войти</SubmitButton>
                </div>
            </FormFormikEnhanced>
        )
    }
}

const mapsDispatchToProps = dispatch => bindActionCreators(
    {
        loginUserSuccess
    }, dispatch);
export default connect(null, mapsDispatchToProps)(LoginForm)