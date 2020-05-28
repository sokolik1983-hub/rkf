import React, { useState } from 'react';
import Card from 'components/Card';
import { Form } from 'components/Form';
import FormField from 'components/Form/Field';
import UppercaseInput from 'components/Form/Field/UppercaseInput';
import SubmitButton from "./components/SubmitButton";
import Alert from 'components/Alert';
import './styles.scss';

const fields = {
    stamp_code: {
        name: 'stamp_code',
        label: 'Код клейма',
        placeholder: 'Введите 3 заглавные латинские бувы',
        title: 'Код клейма состоит из трёх заглавных латинских букв',
        maxLength: 3,
        required: true,
        pattern: '[A-Z]{3}'
    },
    stamp_code_document: {
        name: 'stamp_code_document',
        label: 'Cвидетельство о регистрации кода клейма (PDF, JPEG, JPG, PNG)',
        fieldType: 'file',
        required: true,
        accept: '.pdf,.jpeg,.jpg,.png'
    },
    comment: {
        name: 'comment',
        label: 'Комментарий',
        fieldType: 'textarea'
    }
};

const AddStamp = ({ history }) => {
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const handleSusccess = () => setSuccessAlert(true);
    const handleError = ({ response }) => {
        setErrorText(response ? Object.values(response.data.errors).join(', ') : '');
        setErrorAlert(true);
    };

    return <Card style={{ margin: 0 }}>
        <div className="club-documents-status__head">
            <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            &nbsp;/&nbsp;Клейма
        </div>
        <div className="AddStamp">
            <Form
                action='/api/requests/StampCodeRequest'
                method='POST'
                format='multipart/form-data'
                onSuccess={handleSusccess}
                onError={handleError}
                initialValues={{ stamp_code: '', stamp_code_document: '' }}
            >
                <div className="AddStamp__inline">
                    <UppercaseInput
                        {...fields.stamp_code}
                    />
                    <FormField
                        {...fields.stamp_code_document}
                    />
                </div>
                <FormField
                    {...fields.comment}
                />
                <SubmitButton />
            </Form>
            {successAlert &&
                <Alert
                    text="Код клейма успешно добавлен"
                    autoclose={3}
                    onOk={() => setSuccessAlert(false)}
                />
            }
            {errorAlert &&
                <Alert
                    title="Ошибка!"
                    text={errorText}
                    autoclose={3}
                    onOk={() => setErrorAlert(false)}
                />
            }
        </div>
    </Card>
};

export default AddStamp;