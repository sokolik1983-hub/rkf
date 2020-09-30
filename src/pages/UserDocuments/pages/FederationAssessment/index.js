import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";


const FederationAssessment = () => {
    const [showModal, setShowModal] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    const handleClick = (e, isSupport) => {
        e.preventDefault();

        setIframeLink(isSupport ?
            'https://yandex.ru/poll/enter/WPB2sD4yTqfL1wXY6XaQD6' :
            'https://yandex.ru/poll/enter/RetoLApC8GeRETL4v8BGwE'
        );
        setShowModal(true);
    };

    return (
        <>
            <Card className="documents-card">
                <h3 className="documents-card__title">Оценка работы Федерации</h3>
                <div className="documents-card__content">
                    <p className="documents-card__about">В данном разделе Вы можете поделиться своими впечатлениями от посещения офиса Вашей федерации. Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
                    <div className="documents-card__icon _federation-quality" />
                </div>
                <div className="documents-card__controls">
                    <div className="documents-card__controls-wrap">
                        <Link
                            to="/"
                            className="documents-card__link"
                            onClick={e => handleClick(e, false)}
                        >Оценить работу Федерации</Link>
                    </div>
                </div>
            </Card>
            <Card className="documents-card">
                <h3 className="documents-card__title">Оценка работы службы поддержки Федерации</h3>
                <div className="documents-card__content">
                    <p className="documents-card__about">В данном разделе Вы можете поделиться своими впечатлениями от взаимодействия со службой поддержки федерации.  Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
                    <div className="documents-card__icon _federation-support-quality" />
                </div>
                <div className="documents-card__controls">
                    <div className="documents-card__controls-wrap">
                        <Link
                            to="/"
                            className="documents-card__link"
                            onClick={e => handleClick(e, true)}
                        >Оценить работу службы поддержки Федерации</Link>
                    </div>
                </div>
            </Card>
            {showModal &&
                <Modal showModal={showModal}
                       handleClose={() => {
                           setIframeLink('');
                           setShowModal(false);
                       }}
                       className="documents-card__modal _blue"
                >
                    <iframe src={iframeLink} title="unique_iframe" />
                </Modal>
            }
        </>
    )
};

export default React.memo(FederationAssessment);