import React from 'react'
import FormGroup from "components/Form/FormGroup";
import FormInput from "components/Form/FormInput";
import InputPassword from "components/Form/InputPassword";
import InputPhone from "components/Form/InputPhone";
import Button from "components/Button";

export const RegistrationForm = () =>
    <form>
        <FormGroup inline>
            <FormInput>
                <label>Имя</label>
                <input
                    className="form-input__input"
                    type="text"
                    placeholder="Иван"
                />
            </FormInput>
            <FormInput>
                <label>Фамилия</label>
                <input
                    className="form-input__input"
                    type="text"
                    placeholder="Иванов"
                />
            </FormInput>
        </FormGroup>
        <FormGroup inline>
            <FormInput>
                <label>E-mail</label>
                <input
                    className="form-input__input"
                    type="email"
                    placeholder="Ведите вашу личную почту"
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
        <FormGroup inline>
            <FormInput>
                <label>Телефон</label>
                <InputPhone
                    className="form-input__input"
                    type="text"
                    placeholder="7 ( ) ___ __ __"
                />
            </FormInput>
            <FormInput>
                <label>Проверочный код</label>
                <input
                    className="form-input__input"
                    type="password"
                    placeholder="******"
                />
            </FormInput>
        </FormGroup>
        <div className="form-controls">
            <Button className="btn-primary btn-lg">Зарегистрироваться</Button>
        </div>
    </form>


export const RegistrationFormIP = () =>
    <form>
        <FormGroup inline>
            <FormInput>
                <label>Наименование ИП</label>
                <input
                    className="form-input__input"
                    type="text"
                    placeholder="Полное именование"
                />
            </FormInput>
            <FormInput>
                <label>Статус</label>
                <input
                    className="form-input__input"
                    type="text"
                    placeholder="Региональный или федеральный"
                />
            </FormInput>
        </FormGroup>
        <FormGroup inline>
            <FormInput>
                <label>E-mail</label>
                <input
                    className="form-input__input"
                    type="email"
                    placeholder="Ведите вашу личную почту"
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
        <FormGroup inline>
            <FormInput>
                <label>Телефон</label>
                <InputPhone
                    className="form-input__input"
                    type="text"
                    placeholder="7 ( ) ___ __ __"
                />
            </FormInput>
            <FormInput>
                <label>Проверочный код</label>
                <input
                    className="form-input__input"
                    type="password"
                    placeholder="******"
                />
            </FormInput>
        </FormGroup>
        <div className="form-controls">
            <Button className="btn-primary btn-lg">Зарегистрироваться</Button>
        </div>
    </form>