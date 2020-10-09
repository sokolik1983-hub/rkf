import React, { useState } from "react";
import { Form, FormField, SubmitButton } from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import CustomCheckbox from "../../../../components/Form/CustomCheckbox";
import { config, fields } from "./config";
import "./index.scss";


const IndividualRegistration = ({ history }) => {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const transformValues = values => {
        const newValues = { ...values };
        delete newValues.passwordConfirm;
        return newValues;
    };

    const onSuccess = () => {
        setSuccessAlert(true);
        setTimeout(() => history.push("/"), 7500);
    };

    const dataPrivacyLabel = 'Я согласен с правилами сервиса и даю согласие на обработку моих персональных данных';
    const onPrivacyChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="individual-registration">
            <Form
                {...config}
                transformValues={transformValues}
                onSuccess={onSuccess}
                onError={() => setErrorAlert(true)}
                className="individual-registration__form"
            >
                {fields.map(field => <FormField key={field.name} {...field} />)}
                <CustomCheckbox
                    id="individual-registration__data-privacy"
                    label={dataPrivacyLabel}
                    checked={!!isChecked}
                    onChange={onPrivacyChange}
                />
                <SubmitButton className="individual-registration__form-submit btn btn-primary" disabled={isChecked ? false : true}>Отправить</SubmitButton>
            </Form>
            {successAlert &&
                <Alert
                    title="Регистрация прошла успешно! =)"
                    text={'На указанный e-mail отправлено письмо.'}
                    autoclose={7.5}
                    onOk={() => setSuccessAlert(false)}
                />
            }
            {errorAlert &&
                <Alert
                    title="Произошла ошибка! =("
                    text={'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.'}
                    autoclose={7.5}
                    onOk={() => setErrorAlert(false)}
                />
            }
        </div>
    )
};

export default React.memo(IndividualRegistration);