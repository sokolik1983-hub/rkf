import React, { useState } from "react";
import { object, string } from "yup";

import { Form, SubmitButton, FormGroup, FormField } from 'components/Form';
import FormFile from 'components/Form/Field/FormFile';
import Alert from 'components/Alert';
import Modal from 'components/Modal';

import './styles.scss';

const config = {
    format: "multipart/form-data",
    fields: {
        error_message: {
            name: 'error_message',
            label: 'Сообщение',
            type: 'text',
            fieldType: 'textarea',
            placeholder: "Введите ваше сообщение"
        },
        document: {
            name: 'document',
            type: 'file',
            accept: '.jpg, .jpeg, .pdf'
        }
    },
    validationSchema: object().shape({
        error_message: string()
            .required('Поле не может быть пустым')
    })
};

const ReportErrorForm = ({ id, setIsOpen, profileType, setNeedUpdateTable }) => {
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorText, setErrorText] = useState('');
    const handleError = ({ response }) => {
        setErrorText(response ? Object.values(response.data.errors).join(', ') : '');
        setErrorAlert(true);
    };
    const handleSusccess = () => {
        setNeedUpdateTable(prevState => !prevState);
        setSuccessAlert(true);
    };
    config.action = profileType === "kennel" ? `/api/requests/dog_health_check_request/kenneldoghealthcheckrequest/error` : `/api/requests/dog_health_check_request/doghealthcheckrequest/error`;
    const { fields } = config;
    const initialValues = {
        error_message: '',
        document: null
    };
    const transformValues = values => ({ ...values, id });

    return <div className="ReportErrorForm">
        <h2 className="ReportErrorForm__title">Сообщить об ошибке</h2>
        <Form
            {...config}
            onSuccess={handleSusccess}
            onError={handleError}
            transformValues={transformValues}
            initialValues={initialValues}
        >
            <FormGroup>
                <FormField {...fields.error_message} />
                <div className="FormInput">
                    <label htmlFor="document">Прикрепите файл (JPEG, JPG, PDF)</label>
                    <FormFile {...fields.document} />
                </div>
            </FormGroup>
            <div className="feedback__buttons">
                <button className="btn btn-simple" type="button" onClick={() => setIsOpen(false)}>Отмена</button>
                <SubmitButton className="btn-primary feedback__button">Отправить</SubmitButton>
            </div>
        </Form>
        {successAlert &&
            <Alert
                text="Сообщение отправлено!"
                autoclose={2}
                onOk={() => { setSuccessAlert(false); setIsOpen(false); }}
            />
        }
        {errorAlert &&
            <Alert
                title="Ошибка!"
                text={errorText}
                autoclose={2}
                onOk={() => { setErrorAlert(false); setIsOpen(false); }}
            />
        }
    </div>
};

const ReportError = ({ id, onErrorReport, profileType, setNeedUpdateTable }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleClose = () => {
        setIsModalOpen(false);
        onErrorReport(null);
    }

    return <li className="row-control__item">

        <div className="accordion-nested-item__inner">
            <Modal
                showModal={isModalOpen}
                handleClose={() => handleClose()}
                noBackdrop={true}
                className="user-status-table__modal"
            >
                <ReportErrorForm setNeedUpdateTable={setNeedUpdateTable} id={id} setIsOpen={handleClose} profileType={profileType} />
            </Modal>
        </div>
    </li>
}

export default ReportError;