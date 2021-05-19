import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";
import { Request } from "../../../../utils/request";
import ls from "local-storage";


const MeetingRegistration = () => {
    const [showModal, setShowModal] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [isRKF, setIsRKF] = useState(false);
    const user_email = ls.get('user_info') ? ls.get('user_info').mail : '';

    const handleClick = (e, isRKF) => {
        e.preventDefault();
        setIframeLink(`https://widget.bookform.ru/${isRKF ? '38636' : '30788'}`);
        setIsRKF(isRKF);
        setShowModal(true);
    };

    const correspondenceURL = `https://zline.me/widgets/registration-for-service?service_id=27&email=` + user_email;

    const handleZlineClick = (e, targetUrl, isRKF) => {
        e.preventDefault();
        (() => Request({
            url: `/api/registration/user_info_for_zline_session_registration?alias=rkf`
        }, data => {
            setIframeLink(targetUrl + (data.first_name ? `&first_name=${data.first_name.replaceAll(' ', '_')}` : '') + (data.last_name ? `&last_name=${data.last_name.replaceAll(' ', '_')}` : '') + (data.phone ? `&phone=${data.phone.replaceAll(' ', '_')}` : '') + (data.additional_info ? `&additional_info=${data.additional_info.replaceAll(' ', '_')}` : ''));
            setIsRKF(isRKF);
            setShowModal(true);
        }, error => {
            console.log(error.response);
        }))();
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
                        onClick={e => handleZlineClick(e, correspondenceURL, true)}
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
        </>
    )
};

export default React.memo(MeetingRegistration);