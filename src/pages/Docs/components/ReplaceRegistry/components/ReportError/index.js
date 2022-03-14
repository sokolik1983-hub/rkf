import React, { useState } from "react";
import { Form, SubmitButton, FormGroup, FormField } from 'components/Form';
import FormFile from 'components/Form/Field/FormFile';
import { object, string, mixed } from "yup";
import Alert from 'components/Alert';
import Modal from 'components/Modal';
import './styles.scss';


const ReportErrorForm = ({ id, setIsOpen, setNeedUpdateTable }) => {
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const handleError = ({ response }) => {
        setErrorAlert(true);
    };
    const handleSusccess = () => {
        setNeedUpdateTable(prevState => !prevState);
        setSuccessAlert(true);
    };

    const config = {
        action: '/api/requests/replace_pedigree_request/replacepedigreerequest/error',
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
            document: mixed().test('fileSize', "File Size is too large", value => {
                const sizeInBytes = 20971520; //20MB
                return value.size <= sizeInBytes ? value.size <= sizeInBytes :
                    setErrorAlert(true);
            }),
            error_message: string()
                .required('Поле не может быть пустым')
        })

    };

    const { fields } = config;
    const initialValues = {
        error_message: '',
        document: null
    };
    const transformValues = values => ({ ...values, id });

    return <div className="ReportErrorForm">
        <h2 className="ReportErrorForm__title">Сообщить об ошибке кинолога</h2>
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
                    <label htmlFor="document">Прикрепите файл (JPEG, JPG или PDF, размером не более 20 мб)</label>
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
                text="Формат файла не поддерживается, либо размер файла превышает 20Мб"
                autoclose={3}
                onOk={() => { setErrorAlert(false);}}
            />
        }
    </div>
};

const ReportError = ({ id, onErrorReport, setNeedUpdateTable }) => {
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
                className="status-table__modal"
            >
                <ReportErrorForm setNeedUpdateTable={setNeedUpdateTable} id={id} setIsOpen={handleClose} />
            </Modal>
        </div>
    </li>
}

export default ReportError;