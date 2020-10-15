import React, { useState } from 'react';
import Modal from '../Modal';
import { connect } from "react-redux";
import Alert from 'components/Alert';
// import { Form, SubmitButton, FormGroup, FormField } from '../Form';
//import FormFile from '../Form/Field/FormFile';
// import { feedbackFormConfig, reasons } from "./config";
import LightTooltip from "../LightTooltip";
import './styles.scss';


const Feedback = ({ className, title, HelpdeskApiKey, isMainNav }) => {
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
            let { token } = await fetch('https://help.rkf.online/api/v1/token', options)
                .then(response => response.json());
            window.open('https://help.rkf.online/api/v1/login/' + token);
        } catch (error) {
            setErrorText(error.message);
            setAlert(true);
        }
    };

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
            {isMainNav ? <LightTooltip title="Центр поддержки" enterDelay={200} leaveDelay={200}>
                <a className={`feedback-link${className ? ' ' + className : ''}`}
                    onClick={handleClick}
                    href="/"
                >
                    <svg id="Layer_1" stroke="#90999e" width="30" height="30" className="header__nav-icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M88.11,88c14.2,4.73,27.76,26.81,16.56,36.42-13.53,11.63-20-2.05-27.91,2.84-9.89,6.13-18.61,1.43-22.39-6.14s3.78-18.93,3.78-18.93S70.44,82.06,88.11,88Z"/><path  d="M58.65,92.74c4-1.64,5.33-7.57,3-13.25s-7.46-8.95-11.45-7.31-5.32,7.56-3,13.24S54.66,94.37,58.65,92.74Z"/><path  d="M105.88,92.22c3.76,2,9.14-.71,12-6.07,6.88-12.86-6.78-20.15-13.64-7.28C101.37,84.24,102.12,90.22,105.88,92.22Z"/><path  d="M92,77.28c4.68,1.11,9.77-3.38,11.35-10s-.93-13-5.61-14.09S88,56.52,86.44,63.2,87.36,76.17,92,77.28Z"/><path  d="M71.48,77.58c4.8-.33,8.3-6.15,7.82-13s-4.76-12.11-9.57-11.76-8.3,6.15-7.82,13S66.68,77.93,71.48,77.58Z"/><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8px" d="M158.84,26H45.5c-14,0-17.7,20.08-17.7,31.81V171.37a2.43,2.43,0,0,0,3.56,2.31l50.85-29.41a3.85,3.85,0,0,1,3.87,0l51.5,29.45a2.44,2.44,0,0,0,3.56-2.32V72.9c0-10.27-.62-20.81,2.23-30.76,2.24-7.82,7-16.14,15.47-16.14,0,0,15.06-1.8,15.36,27.6V70.44s-.91,10.69-9.76,10.69h-9.31"/></svg>
                </a>
            </LightTooltip>
            :
            <a style={{ color: '#3366ff', backgroundColor: 'whitesmoke' }} className={`feedback-link${className ? ' ' + className : ''}`}
                onClick={handleClick}
                href="/"
            >
                    {title || 'Центр поддержки'}
                </a>
            }
            <Modal showModal={showModal} handleClose={onModalClose} noBackdrop={true} hideCloseButton={true} className="feedback__modal">
                <div className="feedback">
                    <p>В случае возникновения вопросов просим Вас ознакомиться с <a href="https://help.rkf.online/ru/knowledge_base/" target="_blank" rel="noopener noreferrer">Базой знаний РКФ</a></p>
                    <br />
                    <p>Если Вы не нашли интересующей Вас информации - напишите обращение в соответствующую кинологическую организацию:</p>
                    <p>РФСС - <a href="mailto:support.rfss@rkf.online">support.rfss@rkf.online</a></p>
                    <p>РФЛС - <a href="mailto:support.rfls@rkf.online">support.rfls@rkf.online</a></p>
                    <p>РФОС - <a href="mailto:support.rfos@rkf.online">support.rfos@rkf.online</a></p>
                    <table className="feedback__table">
                        <tbody>
                            <tr>
                                <td>ОАНКОО/Фауна</td>
                                <td style={{ textAlign: 'center' }}>&nbsp;-&nbsp;</td>
                                <td><a href="mailto:support.oankoofauna@rkf.online">support.oankoofauna@rkf.online</a></td>
                            </tr>
                            <tr>
                                <td>ОАНКОО/Элита</td>
                                <td style={{ textAlign: 'center', textIndent: '-3px' }}>&nbsp;-&nbsp;</td>
                                <td><a href="mailto:support.oankooelita@rkf.online">support.oankooelita@rkf.online</a></td>
                            </tr>
                            <tr>
                                <td>ОАНКОО/РКК</td>
                                <td style={{ textAlign: 'center', textIndent: '-16px' }}>&nbsp;-&nbsp;</td>
                                <td><a href="mailto:support.oankoorkk@rkf.online">support.oankoorkk@rkf.online</a></td>
                            </tr>
                        </tbody>
                    </table>
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