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
                    <svg width="33" height="33" id="Layer_1" className="header__nav-icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M93.25,87.06c10.73,3.58,21,20.28,12.52,27.56-10.23,8.79-15.15-1.55-21.11,2.14-7.48,4.64-14.08,1.08-16.94-4.64S70.58,97.8,70.58,97.8,79.88,82.61,93.25,87.06ZM71,90.68c3-1.24,4-5.72,2.27-10s-5.64-6.78-8.66-5.54-4,5.72-2.26,10S68,91.92,71,90.68Zm35.72-.38c2.85,1.52,6.92-.54,9.08-4.6,5.21-9.72-5.13-15.24-10.32-5.51C103.28,84.26,103.84,88.78,106.68,90.3ZM96.22,79c3.54.84,7.38-2.57,8.58-7.61s-.7-9.82-4.24-10.66S93.18,63.29,92,68.34,92.68,78.16,96.22,79Zm-15.55.22C84.29,79,87,74.57,86.58,69.4s-3.6-9.16-7.24-8.89-6.27,4.65-5.91,9.82S77,79.48,80.67,79.22Zm91-2.79c-.85,9.35-8.4,12.08-13.32,11.92L151.65,88h-.12c-5.61,0-5.17-7.16-.12-7.31l6.93-.07c1.56,0,4.85-.45,5.27-5,.22-2.5.1-11.27,0-16,0-1.75,0-3.13,0-3.84,0-4.46-1.18-7.83-3.52-10a12.24,12.24,0,0,0-5.66-2.88,4.43,4.43,0,0,1-1,.16c-.36,0-11.22,1.06-11.22,23,0,105.27.95,99.73-2.22,101.59a4.47,4.47,0,0,1-4.46.06l-48.83-27c-52.4,29-50.24,28.78-53.3,27s-2.21,3.93-2.21-103.94c0-22.46,14.48-29.22,22.14-29.66,107.88,0,100.84-.44,102.63.88a20.51,20.51,0,0,1,9.67,4.9c4.06,3.81,6.12,9.19,6.12,16,0,.68,0,2,.05,3.73C171.84,66.61,171.92,73.73,171.68,76.43ZM138.71,43h-85c-1.86.18-13.58,2-13.58,20.66v92.43C87.45,129.89,84.84,131,86.64,131a4.56,4.56,0,0,1,2.18.56l44.33,24.56C133.15,59.42,131.51,53.86,138.71,43Z"/></svg>
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