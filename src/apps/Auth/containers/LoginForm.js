import React, { PureComponent } from 'react'
//import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Error from 'components/Form/Field/Error'
import {
    FormFormikEnhanced,
    SubmitButton,
    FormGroup,
    FormField,
} from 'components/Form'
import { loginFormConfig } from 'apps/Auth/config'
import { loginUserSuccess } from 'apps/Auth/actions'
import CustomCheckbox from "../../../components/Form/CustomCheckbox";

const { fields } = loginFormConfig;

class LoginForm extends PureComponent {
    state = {
        rememberMe: false
    };

    render() {

        return (
            <FormFormikEnhanced
                onSuccess={this.props.loginUserSuccess}
                {...loginFormConfig}
            >
                <FormGroup>
                    <FormField
                        {...fields.email}
                    />
                    <FormField
                        {...fields.password}
                    />
                    <Error name="authentication" noTouch={true} />
                </FormGroup>
                <FormGroup className="login-form__holder" inline>
                    <CustomCheckbox
                        id="remember-me"
                        label="Запомнить меня"
                        checked={this.state.rememberMe}
                        onChange={() => this.setState({rememberMe: !this.state.rememberMe})}
                    />
                    {/* <div style={{ marginLeft: 'auto' }}><Link className="no-ul" to="/auth/login/restore">Забыли
                        пароль</Link></div> */}
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