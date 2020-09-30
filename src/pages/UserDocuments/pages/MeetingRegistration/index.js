import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";


const MeetingRegistration = () => {
    const [showModal, setShowModal] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    const handleClick = (e, isRKF) => {
        e.preventDefault();

        if(isRKF) {
            setIframeLink('https://widget.bookform.ru/30637');
            setShowModal(true);
        }
    };

    return (
        <>
            <Card className="documents-card">
                <h3 className="documents-card__title">Запись на очный прием в Федерацию</h3>
                <div className="documents-card__content">
                    <p className="documents-card__about">В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                    <div className="documents-card__icon _registration" />
                </div>
                <div className="documents-card__controls">
                    <div className="documents-card__controls-wrap">
                        <Link
                            to="/"
                            className="documents-card__link _disabled"
                            onClick={e => handleClick(e, false)}
                        >Запись в Федерацию</Link>
                    </div>
                </div>
            </Card>
            <Card className="documents-card">
                <h3 className="documents-card__title">Запись на очный прием в РКФ</h3>
                <div className="documents-card__content">
                    <p className="documents-card__about">В данном разделе Вы можете записаться на очный прием в офисе РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                    <div className="documents-card__icon _registration" />
                </div>
                <div className="documents-card__controls">
                    <div className="documents-card__controls-wrap">
                        <Link
                            to="/"
                            className="documents-card__link"
                            onClick={e => handleClick(e, true)}
                        >Запись в РКФ</Link>
                    </div>
                </div>
            </Card>
            {showModal &&
                <Modal showModal={showModal}
                       handleClose={() => {
                           setIframeLink('');
                           setShowModal(false);
                       }}
                       className="documents-card__modal"
                >
                    <iframe src={iframeLink} title="unique_iframe" />
                </Modal>
            }
        </>
    )
};

export default React.memo(MeetingRegistration);