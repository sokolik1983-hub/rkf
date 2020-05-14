import React, { useState } from 'react';
import Modal from '../Modal';
import { connect } from "react-redux";
import Alert from 'components/Alert';
// import { Form, SubmitButton, FormGroup, FormField } from '../Form';
//import FormFile from '../Form/Field/FormFile';
// import { feedbackFormConfig, reasons } from "./config";
import './styles.scss';


const Feedback = ({ className, title, HelpdeskApiKey }) => {
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [errorText, setErrorText] = useState('');
    // const { fields } = feedbackFormConfig;
    // const initialValues = {
    //     reason: null,
    //     full_name: '',
    //     phone_number: '',
    //     mail: '',
    //     description: '',
    //     //picture: null,
    //     terms: false
    // };

    const openHelpdesk = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "apiKey": HelpdeskApiKey })
        };
        try {
            let { token } = await fetch('https://helpapi.rkf.online/api/v1/token', options)
                .then(response => response.json());
            window.open('https://helpapi.rkf.online/api/v1/login/' + token);
        } catch (error) {
            setErrorText(error.message);
            setAlert(true);
        };
    }

    const handleClick = (e) => {
        e.preventDefault();
        HelpdeskApiKey ? openHelpdesk() : setShowModal(true);
    };

    const onModalClose = () => {
        if (showModal) setShowModal(false);
    };

    // const transformValues = values => {
    //     let newValues = { ...values };
    //
    //     newValues.type = newValues.reason;
    //     newValues.title = reasons.filter(r => r.type === newValues.reason)[0].name;
    //     delete newValues.reason;
    //
    //     return { ...newValues }
    // };
    //
    // const onSuccess = () => {
    //     alert('Ваше сообщение отправлено');
    //     setShowModal(false);
    // };
    //
    // const onError = () => {
    //     alert('Произошла ошибка, попробуйте позже');
    //     setShowModal(false);
    // }

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
                    <p>
                        Уважаемые пользователи! В случае возникновения у Вас вопросов по функционированию Цифровой Платформы российского кинологического сообщества RKF.Online просим Вас ознакомиться с разделом "База знаний" в <a
                            href="https://help.rkf.online/" target="_blank" rel="noopener noreferrer">Центре поддержки</a>. <br /><br />
                        Если ответ на Ваш вопрос отсутствует - обратитесь в центр поддержки по email <a href="mailto:support@rkf.online">support@rkf.online</a>. <br /><br />
                        Спасибо, что Вы с нами!
                    </p>
                    {/*<h1>Форма обратной связи</h1>*/}
                    {/*<div className="feedback__inner">*/}
                    {/*    <div className="feedback__close" onClick={onModalClose} />*/}
                    {/*    <Form*/}
                    {/*        {...feedbackFormConfig}*/}
                    {/*        transformValues={transformValues}*/}
                    {/*        onSuccess={onSuccess}*/}
                    {/*        onError={onError}*/}
                    {/*        initialValues={initialValues}*/}
                    {/*    >*/}
                    {/*        <FormGroup>*/}
                    {/*            <FormField {...fields.reason} />*/}
                    {/*            <FormField {...fields.full_name} />*/}
                    {/*            <FormField {...fields.phone_number} />*/}
                    {/*            <FormField {...fields.mail} />*/}
                    {/*            <FormField {...fields.description} />*/}
                    {/*            /!* <div className="FormInput">*/}
                    {/*                <label htmlFor="picture">Прикрепите файл (JPEG, JPG, PNG)</label>*/}
                    {/*                <FormFile {...fields.picture} />*/}
                    {/*            </div> *!/*/}
                    {/*            <FormField {...fields.terms} />*/}
                    {/*        </FormGroup>*/}
                    {/*        <div className="feedback__buttons">*/}
                    {/*            <button className="btn btn-simple" onClick={onModalClose}>Отмена</button>*/}
                    {/*            <SubmitButton className="btn-primary feedback__button">Отправить</SubmitButton>*/}
                    {/*        </div>*/}
                    {/*    </Form>*/}
                    {/*</div>*/}
                </div>
            </Modal>
            {alert &&
                <Alert
                    title="Ошибка!"
                    text={errorText}
                    autoclose={2.5}
                    onOk={() => setAlert(false)}
                />
            }
        </>
    );
};

const mapStateToProps = state => ({
    HelpdeskApiKey: state.authentication.helpdesk_api_key
});

export default connect(mapStateToProps)(Feedback);