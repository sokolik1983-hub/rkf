import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import Alert from "../../../../../../Alert";
import {Form, FormField, SubmitButton} from "../../../../../../Form";
import CustomCheckbox from "../../../../../../Form/CustomCheckbox";
import {config, fields} from "./config";
import personalDataProcessingPolicyDoc from "../../../../../../../pages/PersonalDataProcessingPolicy/Politika_PDn.pdf";
import personalDataProcessingPolicyPDF from "../../../../../../../pages/PersonalDataProcessingPolicy/PPDn.pdf";

import "./index.scss";


const IndividualRegistration = () => {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const history = useHistory();

    const transformValues = values => {
        const newValues = {...values};

        delete newValues.passwordConfirm;

        return newValues;
    };

    const onSuccess = () => {
        setSuccessAlert(true);

        setTimeout(() => history.push("/auth/login"), 7500);
    };

    const onPrivacyChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="individual-registration">
            <Form
                {...config}
                className="individual-registration__form"
                transformValues={transformValues}
                onSuccess={onSuccess}
                onError={() => setErrorAlert(true)}
            >
                {fields.map(field => <FormField key={field.name} {...field} />)}
                <div className="individual-registration__psw-wrap">
                    <FormField
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Пароль"
                        placeholder="Введите пароль"
                    />
                    <button
                        className={`individual-registration__psw${showPassword ? ' _show-password' : ''}`}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    <FormField
                        name="passwordConfirm"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        label="Подтверждение пароля"
                        placeholder="Введите подтверждение пароля"
                    />
                    <button
                        className={`individual-registration__psw-confirm${showPasswordConfirm ? ' _show-confirm' : ''}`}
                        type="button"
                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    />
                </div>
                <CustomCheckbox
                    id="individual-registration__data-privacy"
                    checked={!!isChecked}
                    onChange={onPrivacyChange}
                />
                <label htmlFor="individual-registration__data-privacy">
                    Я принимаю условия&nbsp;
                        <Link
                            to={personalDataProcessingPolicyDoc}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Пользовательского соглашение&nbsp;
                        </Link>
                    и даю свое согласие на обработку моей персональной информации на условиях, определенных&nbsp;
                        <Link
                            to={personalDataProcessingPolicyPDF}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Политикой&nbsp;конфиденциальности.
                        </Link>
                </label>
                <SubmitButton
                    className="individual-registration__form-submit btn btn-primary"
                    disabled={!isChecked}
                >
                    Отправить
                </SubmitButton>
            </Form>
            {successAlert &&
                <Alert
                    title="Регистрация прошла успешно!"
                    text="На указанный e-mail отправлено письмо."
                    autoclose={7.5}
                    onOk={() => setSuccessAlert(false)}
                />
            }
            {errorAlert &&
                <Alert
                    title="Произошла ошибка! =("
                    text="Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи."
                    autoclose={7.5}
                    onOk={() => setErrorAlert(false)}
                />
            }
        </div>
    )
};

export default memo(IndividualRegistration);