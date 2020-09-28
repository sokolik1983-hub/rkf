import React, {useState} from "react";
import {Form, FormField, SubmitButton} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import {config, fields} from "./config";
import "./index.scss";


const IndividualRegistration = () => {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const transformValues = values => {
        const newValues = { ...values };
        delete newValues.passwordConfirm;
        return newValues;
    };

    return (
        <div className="individual-registration">
            <Form
                {...config}
                transformValues={transformValues}
                onSuccess={() => setSuccessAlert(true)}
                onError={() => setErrorAlert(true)}
                className="individual-registration__form"
            >
                {fields.map(field => <FormField key={field.name} {...field} />)}
                <SubmitButton className="individual-registration__form-submit btn btn-primary">Отправить</SubmitButton>
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