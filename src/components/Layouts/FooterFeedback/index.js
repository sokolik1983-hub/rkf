import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Modal from '../../Modal';
import Alert from '../../Alert';
import FeedBack from './Feedback';
import {blockContent} from '../../../utils/blockContent';

import './style.scss'


const FooterFeedback = ({ showCopyright = true }) => {
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
        blockContent(false);
    };


    return (
        <div className="footer-feedback">
            <p className="footer-feedback__copyright">{showCopyright && `Российская кинологическая федерация © 1991—${new Date().getFullYear()}`}</p>
            <p className="footer-feedback__copyright-short">{showCopyright && `РКФ © 1991—${new Date().getFullYear()}`}</p>
            <Link to="/about" className="footer-feedback__copyright-link">О RKF.Online</Link>
            <div className="footer-feedback__request">
                <div className="footer-feedback__link"
                        onClick={() => setShowModal(true)}
                >Связаться с разработчиками</div>
                {showModal &&
                    <Modal
                        showModal={showModal}
                        handleClose={closeModal}
                        outsideClickHandler={() => setShowModal(false)}
                        className="stage-controls__modal"
                        headerName="Сообщить об ошибке"
                    >
                        <FeedBack
                            setShowModal={setShowModal}
                            setOkAlert={setOkAlert}
                            setErrAlert={setErrAlert}
                            blockContent={blockContent}
                        />
                    </Modal>
                }
                {okAlert &&
                    <Alert
                        title="Заявка отправлена"
                        text="Ваша заявка отправлена"
                        autoclose={2.5}
                        okButton={true}
                        onOk={() => setOkAlert(false)}
                    />
                }
                {errAlert &&
                    <Alert
                        title="Ошибка отправки"
                        text="Пожалуйста, проверьте правильность заполнения всех полей"
                        autoclose={2.5}
                        onOk={() => setErrAlert(false)}
                    />
                }
            </div>
            <p className="footer-feedback__all-rights">Все права защищены.</p>
        </div>
    );
};

export default FooterFeedback;
