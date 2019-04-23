import React from 'react'
import FormGroup from "components/Form/FormGroup";
import FormInput from "components/Form/FormInput";
import InputPassword from "components/Form/InputPassword";
import InputPhone from "components/Form/InputPhone";
import Button from "components/Button";

const LoginForm = () =>
    <form>
        <FormGroup>
            <FormInput>
                <label>Телефон</label>
                <InputPhone
                    className="form-input__input"
                    type="text"
                    placeholder="7 ( ) ___ __ __"
                />
            </FormInput>
            <FormInput>
                <label>Пароль</label>
                <InputPassword
                    className="form-input__input"
                    placeholder="Минимум 8 символов"
                />
            </FormInput>
        </FormGroup>

        <div className="form-controls">
            <Button className="btn-primary btn-lg">Войти</Button>
        </div>
    </form>

export default LoginForm;