import React, {useEffect, useState} from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import Alert from 'components/Alert';

import {blockContent} from '../../utils/blockContent';

import './styles.scss';


const Feedback = ({className, title, HelpdeskApiKey, isMainNav }) => {
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [errorText, setErrorText] = useState('');

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
        e.stopPropagation();
        HelpdeskApiKey ? openHelpdesk() : setShowModal(true);
    };


    useEffect(() => {
        if(showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [showModal])

    return (
        <>
            {isMainNav ?
                <a className={`feedback-link${className ? ' ' + className : ''}`}
                   onClick={handleClick}
                   href="/"
                >
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6316 10.5935C12.9436 11.3527 15.152 14.8378 13.3404 16.3561C11.132 18.2022 10.0795 16.0456 8.78555 16.822C7.16374 17.7881 5.74897 17.0463 5.1451 15.8385C4.52399 14.648 5.76622 12.8537 5.76622 12.8537C5.76622 12.8537 7.75035 9.66185 10.6316 10.5935Z" fill="#90999E"/>
                        <path d="M5.83534 11.3527C6.49096 11.0939 6.698 10.1622 6.31843 9.24778C5.93885 8.35061 5.09344 7.83301 4.43782 8.09181C3.79945 8.35061 3.57516 9.29954 3.95473 10.1967C4.3343 11.0766 5.17971 11.6115 5.83534 11.3527Z" fill="#90999E"/>
                        <path d="M13.5303 11.2664C14.1514 11.5769 15.0313 11.1456 15.4971 10.3002C16.6186 8.26428 14.3929 7.10831 13.2715 9.1442C12.7884 9.98961 12.9091 10.9558 13.5303 11.2664Z" fill="#90999E"/>
                        <path d="M11.27 8.90284C12.0291 9.07537 12.8746 8.36798 13.1161 7.31553C13.3749 6.26308 12.9608 5.24514 12.2017 5.08986C11.4425 4.91733 10.6144 5.60746 10.3556 6.67716C10.114 7.72961 10.5109 8.7303 11.27 8.90284Z" fill="#90999E"/>
                        <path d="M7.92288 8.9371C8.69928 8.88534 9.28589 7.95367 9.19963 6.86671C9.13061 5.79701 8.42323 4.96885 7.62958 5.02061C6.85318 5.07237 6.28382 5.98679 6.35283 7.07375C6.4391 8.16071 7.14648 9.00612 7.92288 8.9371Z" fill="#90999E"/>
                        <path d="M18.8961 25C18.7063 25 18.5337 24.9482 18.344 24.862L9.92436 20.1863L1.78081 24.8447C1.59102 24.9482 1.40124 25 1.1942 25C0.969906 25 0.762867 24.931 0.555828 24.8102C0.176255 24.5687 -0.0307839 24.1891 0.00372268 23.7405V5.81435C0.00372268 2.9158 1.14244 0 3.67867 0C3.67867 0 22.1914 0 22.2087 0C22.5538 0 23.2784 0.0690131 23.9858 0.672878C24.952 1.53554 25.4523 3.03658 25.4696 5.14148V7.81574C25.4006 8.6784 24.8139 10.3002 23.0886 10.3002H21.5703C21.139 10.3002 20.7767 9.93789 20.7767 9.50656C20.7767 9.07522 21.139 8.71291 21.5703 8.71291H23.0886C23.6752 8.71291 23.8478 8.10904 23.8995 7.72947V5.14148C23.8823 3.12284 23.3819 2.24293 22.9678 1.86335C22.64 1.57005 22.3467 1.5528 22.2777 1.5528C21.1217 1.62181 20.6214 2.82954 20.4144 3.55418C20.052 4.7619 20.0693 6.09041 20.0693 7.36715L20.0865 8.19531V23.7923C20.121 24.1891 19.914 24.5859 19.5344 24.8102C19.3446 24.931 19.1204 25 18.8961 25ZM9.99337 18.6335C10.2349 18.6335 10.4592 18.7026 10.7008 18.8233L18.4992 23.1539V7.47067C18.482 6.12491 18.4647 4.58937 18.8961 3.10559C19.0686 2.51898 19.2929 2.00138 19.5689 1.57005H3.67867C2.02236 1.57005 1.59102 4.34783 1.59102 5.81435V23.1366L9.28599 18.8233C9.51028 18.6853 9.73457 18.6335 9.99337 18.6335Z" fill="#90999E"/>
                    </svg>
                    <div className={`feedback-link${className ? ' ' + className : ''}`}
                       onClick={handleClick}
                    >
                        <span>{title || 'Центр поддержки'}</span>
                    </div>
                </a>
                :
                <a style={{ color: '#3366ff' }} className={`feedback-link${className ? ' ' + className : ''}`}
                   onClick={handleClick}
                   href="/"
                >
                    <span>{title || 'Центр поддержки'}</span>
                </a>

            }


            <Modal
                showModal={showModal} handleClose={() => setShowModal(false)}
                iconName="help-white"
                headerName="Центр поддержки"
                noBackdrop={true}
                className={`feedback__modal feedback_modal_popup`} >
                <div className="feedback">
                    <div className="feedback_modal_body">
                        <p>В случае возникновения вопросов просим Вас ознакомиться с <a href="https://help.rkf.online/ru/knowledge_base/" target="_blank" rel="noopener noreferrer">Базой знаний РКФ</a></p>
                        <p>Если Вы не нашли интересующей Вас информации - напишите обращение в соответствующую кинологическую организацию:</p>
                        <p>РФСС - <a href="mailto:support.rfss@rkf.online">support.rfss@rkf.online</a></p>
                        <p>РФЛС - <a href="mailto:support.rfls@rkf.online">support.rfls@rkf.online</a></p>
                        <p>РФОС - <a href="mailto:support.rfos@rkf.online">support.rfos@rkf.online</a></p>
                        <table className="feedback__table">
                            <tbody>
                                <tr>
                                    <td>ОАНКОО/Фауна</td>
                                    <td className="_text-align-center">&nbsp;-&nbsp;
                                        <a href="mailto:support.oankoofauna@rkf.online">support.oankoofauna@rkf.online</a></td>
                                </tr>
                                <tr>
                                    <td>ОАНКОО/Элита</td>
                                    <td className="_text-align-center _indent-3">&nbsp;-&nbsp;
                                        <a href="mailto:support.oankooelita@rkf.online">support.oankooelita@rkf.online</a></td>
                                </tr>
                                <tr>
                                    <td>ОАНКОО/РКК</td>
                                    <td className="_text-align-center _indent-16">&nbsp;-&nbsp;
                                        <a href="mailto:support.oankoorkk@rkf.online">support.oankoorkk@rkf.online</a></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

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