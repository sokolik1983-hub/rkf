import React, { useState } from 'react';
import Modal from '../Modal';
import {Form, SubmitButton, FormGroup, FormField} from '../Form';
import {feedbackFormConfig} from "./config";
import './styles.scss';


const Feedback = ({className}) => {
    const [showModal, setShowModal] = useState(false);
    const {fields} = feedbackFormConfig;
    const initialValues = {
        reason: null,
        full_name: '',
        phone_number: '',
        mail: '',
        description: ''
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const onModalClose = () => {
        if (showModal && window.confirm('Действительно закрыть окно?')) setShowModal(false);
    };

    const transformValues = values => {
        let newValues = { ...values };

        newValues.type = newValues.reason;
        newValues.title = '';
        delete newValues.reason;

        return {...newValues}
    };

    const onSuccess = data => {
        if (data) {
            alert('Ваше сообщение отправлено');
            setShowModal(false);
        } else {
            alert('Произошла ошибка, попробуйте позже');
        }
    };

    return (
        <>
            <a className={`feedback-link${className ? ' ' + className : ''}`} onClick={handleClick} href="/">Обратная связь</a>
            <Modal showModal={showModal} handleClose={onModalClose} noBackdrop={true}>
                <div className="feedback">
                    <Form
                        {...feedbackFormConfig}
                        transformValues={transformValues}
                        onSuccess={onSuccess}
                        initialValues={initialValues}
                    >
                        <FormGroup>
                            <FormField
                                {...fields.reason}
                            />
                            <FormField
                                {...fields.full_name}
                            />
                            <FormField
                                {...fields.phone_number}
                            />
                            <FormField
                                {...fields.mail}
                            />
                            <FormField
                                {...fields.description}
                            />
                        </FormGroup>
                        <SubmitButton className="btn-primary btn-lg">Отправить</SubmitButton>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default Feedback;