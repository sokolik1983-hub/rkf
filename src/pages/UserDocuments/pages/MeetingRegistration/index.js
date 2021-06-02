import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";
import ZlineModal from "../../../../components/BookformCard/components/ZlineModal";


const MeetingRegistration = () => {
    const [showModal, setShowModal] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [isRKF, setIsRKF] = useState(false);
    const [showZlineModal, setShowZlineModal] = useState(false);

    const handleClick = (e, isRKF) => {
        e.preventDefault();
        setIframeLink(`https://widget.bookform.ru/${isRKF ? '38636' : '30788'}`);
        setIsRKF(isRKF);
        setShowModal(true);
    };

    const handleZlineClick = (e) => {
        e.preventDefault();
        setShowZlineModal(true);
    };

    return (
        <>
            <Card className="documents-card">
                <div className="documents-card__icon _registration" />
                <h3 className="documents-card__title">Запись на очный прием в Федерацию</h3>
                <p className="documents-card__about">В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                <p className="documents-card__about">Отменить запись в Федерацию Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
                <div className="documents-card__controls">
                    <Link
                        to="/"
                        className="documents-card__link"
                        onClick={e => handleClick(e, false)}
                    >Запись в Федерацию</Link>
                </div>
            </Card>
            <Card className="documents-card">
                <div className="documents-card__icon _registration" />
                <h3 className="documents-card__title">Запись на очный прием в РКФ</h3>
                <p className="documents-card__about">В данном разделе Вы можете записаться на очный прием в офисе РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                <p className="documents-card__about">Отменить запись в РКФ Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
                <div className="documents-card__controls">
                    <Link
                        to="/"
                        className="documents-card__link"
                        onClick={e => handleClick(e, true)}
                    >Запись в РКФ</Link>
                    <Link
                        to="/"
                        className="documents-card__link"
                        onClick={e => handleZlineClick(e)}
                    >Подача корреспонденции в РКФ</Link>
                </div>
            </Card>
            {showModal &&
                <Modal showModal={showModal}
                    handleClose={() => {
                        setIframeLink('');
                        setShowModal(false);
                    }}
                    className="documents-card__modal"
                    headerName={`Запись в ${isRKF ? "РКФ" : "Федерацию"}`}
                >
                    <iframe src={iframeLink} title="unique_iframe" />
                </Modal>
            }
            <ZlineModal showModal={showZlineModal}
                handleClose={() => {
                    setShowZlineModal(false);
                }}
            >
                <iframe src={'https://zline.me/widgets/registration-for-service?id=10'} title="unique_iframe" />
            </ZlineModal>
        </>
    )
};

export default React.memo(MeetingRegistration);