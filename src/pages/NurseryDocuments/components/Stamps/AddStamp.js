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
        label: 'Cвидетельство о регистрации кода клейма (PDF, JPEG, JPG)',
        fieldType: 'file',
        required: true,
        accept: '.pdf,.jpeg,.jpg,'
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
    const [weightAlert, setWeightAlert] = useState(false);


    const handleSusccess = () => setSuccessAlert(true);
    const handleError = ({ response }) => {
        setErrorText(response ? Object.values(response.data.errors).join(', ') : '');
        setErrorAlert(true);
    };
    const handleWeight = (e) => {
        if (e.target.files[0].size > 20971520) {
            e.target.value = '';
            setWeightAlert(true);
        }
    }

    return <Card style={{ margin: 0 }}>
        <div className="nursery-documents-status__head">
            <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            &nbsp;/&nbsp;Клейма
        </div>
        <div className="AddStamp">
            <Form
                action='/api/requests/NurseryStampCodeRequest'
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
                        onInput={handleWeight}
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
                    onOk={() => {
                        setSuccessAlert(false);
                        history.goBack();
                    }}
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
            {weightAlert &&
                <Alert
                    title="Ошибка!"
                    text="Размер файла не должен превышать 20 Мб"
                    autoclose={3}
                    onOk={()=> setWeightAlert(false)}
                />
            }
        </div>
    </Card>
};

export default AddStamp;