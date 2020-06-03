import React, { useState } from 'react';
import { Form, FormField } from 'components/Form';
import Alert from 'components/Alert';
import { connect } from 'formik';
import config, { fields } from './config';
import './styles.scss';

const IndividualRegistration = () => {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    return <>
        <Form
            {...config}
            onSuccess={() => setSuccessAlert(true)}
            onError={() => setErrorAlert(true)}
            className="IndividualRegistration"
        >
            {fields.map((f, key) => <FormField key={key} type={f.type} label={f.label} name={f.name} placeholder={f.placeholder} />)}
            <button type="submit">Зарегистрироваться</button>
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
    </>
};

export default connect(IndividualRegistration);