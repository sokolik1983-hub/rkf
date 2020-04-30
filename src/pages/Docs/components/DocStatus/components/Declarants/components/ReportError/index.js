import React, { useState } from "react";
import { Form, SubmitButton, FormGroup, FormField } from 'components/Form';
import FormFile from 'components/Form/Field/FormFile';
import { object, string } from "yup";
import Alert from 'components/Alert';
import './styles.scss';

const config = {
    action: '/',
    format: "multipart/form-data",
    fields: {
        description: {
            name: 'description',
            label: 'Сообщение',
            type: 'text',
            fieldType: 'textarea',
            placeholder: "Введите ваше сообщение"
        },
        picture: {
            name: 'picture',
            type: 'file',
            accept: '.jpg, .jpeg, .png'
        }
    },
    validationSchema: object().shape({
        description: string()
            .required('Поле не может быть пустым')
    })
};

const ReportError = ({ setIsNestedOpen }) => {
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const handleError = () => setErrorAlert(true);
    const handleSusccess = () => {
        setSuccessAlert(true);
        setIsNestedOpen(false);
    };
    const { fields } = config;
    const initialValues = {
        description: '',
        picture: null
    };

    return <div className="ReportError">
        <Form
            {...config}
            onSuccess={handleSusccess}
            onError={handleError}
            initialValues={initialValues}
        >
            <FormGroup>
                <FormField {...fields.description} />
                <div className="FormInput">
                    <label htmlFor="picture">Прикрепите файл (JPEG, JPG, PNG)</label>
                    <FormFile {...fields.picture} />
                </div>
            </FormGroup>
            <div className="feedback__buttons">
                <button className="btn btn-simple" type="button" onClick={() => setIsNestedOpen(false)}>Отмена</button>
                <SubmitButton className="btn-primary feedback__button">Отправить</SubmitButton>
            </div>
        </Form>
        {successAlert &&
            <Alert
                text="Сообщение отправлено!"
                autoclose={2}
                onOk={() => setSuccessAlert(false)}
            />
        }
        {errorAlert &&
            <Alert
                title="Ошибка!"
                text="Сообщение не отправлено"
                autoclose={2}
                onOk={() => setErrorAlert(false)}
            />
        }
    </div>
};

export default ReportError;