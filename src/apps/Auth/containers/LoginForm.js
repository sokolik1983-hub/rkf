import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Error from 'components/Form/Field/Error'
import {
    FormFormikEnhanced,
    SubmitButton,
    FormGroup,
    FormFieldNoError,
    FormInput,
} from 'components/Form'


import { loginFormConfig } from 'apps/Auth/config'

import { loginUserSuccess } from 'apps/Auth/actions'

const { fields } = loginFormConfig;

class LoginForm extends PureComponent {
    render() {

        return (
            <FormFormikEnhanced
                onSuccess={this.props.loginUserSuccess}
                {...loginFormConfig}
            >
                <FormGroup>
                    <FormFieldNoError
                        {...fields.email}
                    />
                    <FormFieldNoError
                        {...fields.password}
                    />
                    <Error name="authentication" noTouch={true} />
                </FormGroup>
                <FormGroup className="login-form__holder" inline>
                    <FormInput checkbox>
                        <label>Запомнить меня</label>
                        <input type="checkbox" className="FormInput__input" />
                    </FormInput>
                    <div style={{ marginLeft: 'auto' }}><Link className="no-ul" to="/auth/login/restore">Забыли
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