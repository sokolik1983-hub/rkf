import React, { useState } from 'react';
import Modal from '../Modal';
import { Form, SubmitButton, FormGroup, FormField } from '../Form';
import { feedbackFormConfig } from "./config";
import './styles.scss';


const Feedback = ({ className, title }) => {
    const [showModal, setShowModal] = useState(false);
    const { fields } = feedbackFormConfig;
    const initialValues = {
        reason: null,
        full_name: '',
        phone_number: '',
        mail: '',
        description: '',
        terms: false
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const onModalClose = () => {
        if (showModal) setShowModal(false);
    };

    const transformValues = values => {
        let newValues = { ...values };

        newValues.type = newValues.reason;
        newValues.title = '';
        delete newValues.reason;

        return { ...newValues }
    };

    const onSuccess = () => {
        alert('Ваше сообщение отправлено');
        setShowModal(false);
    };

    const onError = () => {
        alert('Произошла ошибка, попробуйте позже');
        setShowModal(false);
    }

    return (
        <>
            <a className={`feedback-link${className ? ' ' + className : ''}`}
                onClick={handleClick}
                href="/"
            >
                {title || 'Обратная связь'}
            </a>
            <Modal showModal={showModal} handleClose={onModalClose} noBackdrop={true} hideCloseButton={true} className="feedback__modal">
                <div className="feedback">
                    <h1>Форма обратной связи</h1>
                    <div className="feedback__inner">
                        <div className="feedback__close" onClick={onModalClose} />
                        <Form
                            {...feedbackFormConfig}
                            transformValues={transformValues}
                            onSuccess={onSuccess}
                            onError={onError}
                            initialValues={initialValues}
                        >
                            <FormGroup>
                                <FormField {...fields.reason} />
                                <FormField {...fields.full_name} />
                                <FormField {...fields.phone_number} />
                                <FormField {...fields.mail} />
                                <FormField {...fields.description} />
                                <FormField {...fields.terms} />
                            </FormGroup>
                            <div className="feedback__buttons">
                                <button className="btn btn-simple" onClick={onModalClose}>Отмена</button>
                                <SubmitButton className="btn-primary feedback__button">Отправить</SubmitButton>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Feedback;