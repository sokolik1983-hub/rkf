import React, { useState } from "react";
import Card from "../../../../components/Card";
import ZlineModal from "../../../../components/ZlineModal";
// import { Link } from "react-router-dom";


const MeetingRegistration = () => {
    const [showModal, setShowModal] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    const handleClick = (e, isRKF) => {
        e.preventDefault();
        setIframeLink(process.env.NODE_ENV === 'production' ?
            `https://zline.me/widgets/registration-for-service?id=${isRKF ? '18' : '19'}` :
            'http://zsdev.uep24.ru/widgets/registration-for-service?id=94'
        );
        setShowModal(true);
    };

    return (
        <>
            <Card className="documents-card">
                <div className="documents-card__icon _registration" />
                <h3 className="documents-card__title">Запись на очный прием в Федерацию</h3>
                <p className="documents-card__about">В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                <p className="documents-card__about">Отменить запись в Федерацию Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
                <div className="documents-card__controls">
                    {/*<Link
                        to="/"
                        className="documents-card__link"
                        onClick={e => handleClick(e, false)}
                    >Запись в Федерацию</Link>*/}
                    <span className="documents-card__link" onClick={e => handleClick(e, false)}>Запись в Федерацию</span>
                </div>
            </Card>
            <Card className="documents-card">
                <div className="documents-card__icon _registration" />
                <h3 className="documents-card__title">Запись на очный прием в РКФ</h3>
                <p className="documents-card__about">В данном разделе Вы можете записаться на очный прием в офисе РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность.</p>
                <p className="documents-card__about">Отменить запись в РКФ Вы можете в группе в Telegram по ссылке <a href="https://t.me/EntryRKFOnline" target="_blank" rel="noopener noreferrer">https://t.me/EntryRKFOnline</a></p>
                <div className="documents-card__controls">
                    {/*<Link
                        to="/"
                        className="documents-card__link"
                        onClick={e => handleClick(e, true)}
                    >Запись на услуги РКФ</Link>*/}
                    <span className="documents-card__link" onClick={e => handleClick(e, true)}>Запись на услуги РКФ</span>
                </div>
            </Card>
            {showModal && <ZlineModal showModal={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setIframeLink('');
                }}
            >
                <iframe src={iframeLink} title="zline_iframe" />
            </ZlineModal>}
        </>
    )
};

export default React.memo(MeetingRegistration);