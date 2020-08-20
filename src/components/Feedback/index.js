import React, { useState } from 'react';
import Modal from '../Modal';
import { connect } from "react-redux";
import Alert from 'components/Alert';
// import { Form, SubmitButton, FormGroup, FormField } from '../Form';
//import FormFile from '../Form/Field/FormFile';
// import { feedbackFormConfig, reasons } from "./config";
import { LightTooltip } from "../../components/Layouts/Header/components/Nav";
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
                    <svg id="Layer_1" class="header__nav-icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path  d="M146.67,163.72H53.28a15.24,15.24,0,0,1-15.23-15.23V55.11A15.25,15.25,0,0,1,53.28,39.87h93.39A15.25,15.25,0,0,1,161.9,55.11v93.38A15.24,15.24,0,0,1,146.67,163.72ZM53.28,47.87a7.24,7.24,0,0,0-7.23,7.24v93.38a7.23,7.23,0,0,0,7.23,7.23h93.39a7.23,7.23,0,0,0,7.23-7.23V55.11a7.24,7.24,0,0,0-7.23-7.24Z"/><path  d="M131.54,146.3H68.41a13,13,0,0,1-12.93-12.94V70.23A12.94,12.94,0,0,1,68.41,57.3h63.13a13,13,0,0,1,12.94,12.93v63.13A13,13,0,0,1,131.54,146.3Zm-63.13-81a4.93,4.93,0,0,0-4.93,4.93v63.13a4.94,4.94,0,0,0,4.93,4.94h63.13a5,5,0,0,0,4.94-4.94V70.23a4.94,4.94,0,0,0-4.94-4.93Z"/><path  d="M110.64,125.36H89.31a12.91,12.91,0,0,1-12.9-12.9V91.13a12.92,12.92,0,0,1,12.9-12.9h21.33a12.91,12.91,0,0,1,12.9,12.9v21.33A12.91,12.91,0,0,1,110.64,125.36ZM89.31,86.23a4.91,4.91,0,0,0-4.9,4.9v21.33a4.9,4.9,0,0,0,4.9,4.9h21.33a4.9,4.9,0,0,0,4.9-4.9V91.13a4.91,4.91,0,0,0-4.9-4.9Z"/><path  d="M29,153.57H14.58a4,4,0,0,1,0-8H29a4,4,0,0,1,0,8Z"/><path  d="M29,134.45H14.58a4,4,0,0,1,0-8H29a4,4,0,1,1,0,8Z"/><path  d="M29,115.33H14.58a4,4,0,1,1,0-8H29a4,4,0,0,1,0,8Z"/><path  d="M29,96.21H14.58a4,4,0,1,1,0-8H29a4,4,0,1,1,0,8Z"/><path  d="M29,77.09H14.58a4,4,0,1,1,0-8H29a4,4,0,0,1,0,8Z"/><path  d="M29,58H14.58a4,4,0,1,1,0-8H29a4,4,0,0,1,0,8Z"/><path  d="M185.42,153.57H171a4,4,0,0,1,0-8h14.4a4,4,0,1,1,0,8Z"/><path  d="M185.42,134.45H171a4,4,0,0,1,0-8h14.4a4,4,0,1,1,0,8Z"/><path  d="M185.42,115.33H171a4,4,0,0,1,0-8h14.4a4,4,0,0,1,0,8Z"/><path  d="M185.42,96.21H171a4,4,0,0,1,0-8h14.4a4,4,0,0,1,0,8Z"/><path  d="M185.42,77.09H171a4,4,0,0,1,0-8h14.4a4,4,0,0,1,0,8Z"/><path  d="M185.42,58H171a4,4,0,0,1,0-8h14.4a4,4,0,0,1,0,8Z"/><path  d="M52.2,34.75a4,4,0,0,1-4-4V16.35a4,4,0,0,1,8,0v14.4A4,4,0,0,1,52.2,34.75Z"/><path  d="M71.32,34.75a4,4,0,0,1-4-4V16.35a4,4,0,1,1,8,0v14.4A4,4,0,0,1,71.32,34.75Z"/><path  d="M90.44,34.75a4,4,0,0,1-4-4V16.35a4,4,0,0,1,8,0v14.4A4,4,0,0,1,90.44,34.75Z"/><path  d="M109.56,34.75a4,4,0,0,1-4-4V16.35a4,4,0,0,1,8,0v14.4A4,4,0,0,1,109.56,34.75Z"/><path  d="M128.68,34.75a4,4,0,0,1-4-4V16.35a4,4,0,1,1,8,0v14.4A4,4,0,0,1,128.68,34.75Z"/><path  d="M147.8,34.75a4,4,0,0,1-4-4V16.35a4,4,0,1,1,8,0v14.4A4,4,0,0,1,147.8,34.75Z"/><path  d="M52.2,191.2a4,4,0,0,1-4-4V172.79a4,4,0,0,1,8,0V187.2A4,4,0,0,1,52.2,191.2Z"/><path  d="M71.32,191.2a4,4,0,0,1-4-4V172.79a4,4,0,0,1,8,0V187.2A4,4,0,0,1,71.32,191.2Z"/><path  d="M90.44,191.2a4,4,0,0,1-4-4V172.79a4,4,0,0,1,8,0V187.2A4,4,0,0,1,90.44,191.2Z"/><path  d="M109.56,191.2a4,4,0,0,1-4-4V172.79a4,4,0,0,1,8,0V187.2A4,4,0,0,1,109.56,191.2Z"/><path  d="M128.68,191.2a4,4,0,0,1-4-4V172.79a4,4,0,0,1,8,0V187.2A4,4,0,0,1,128.68,191.2Z"/><path  d="M147.8,191.2a4,4,0,0,1-4-4V172.79a4,4,0,0,1,8,0V187.2A4,4,0,0,1,147.8,191.2Z"/></svg>
                </a>
            </LightTooltip>
            :
            <a className={`feedback-link${className ? ' ' + className : ''}`}
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