import React, { useState } from 'react';
import Modal from '../Modal';
import { Form, SubmitButton, FormGroup, FormField } from '../Form';
import FormFile from '../Form/Field/FormFile';
import { feedbackFormConfig, reasons } from "./config";
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
        picture: null,
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
        newValues.title = reasons.filter(r => r.type === newValues.reason)[0].name;
        delete newValues.reason;

        return { ...newValues }
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
                            initialValues={initialValues}
                        >
                            <FormGroup>
                                <FormField {...fields.reason} />
                                <FormField {...fields.full_name} />
                                <FormField {...fields.phone_number} />
                                <FormField {...fields.mail} />
                                <FormField {...fields.description} />
                                <div className="FormInput">
                                    <label htmlFor="picture">Прикрепите файл</label>
                                    <FormFile {...fields.picture} />
                                </div>
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