import React, {useEffect, useState} from "react";
import Card from "components/Card";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import Modal from "components/Modal";
import {Request} from "utils/request";
import "./index.scss";

const feds = {
    "РФСС": {
        id: 30629,
        federation: 'https://yandex.ru/poll/enter/EyPLyK531CypGWfK4kpumN',
        support: 'https://yandex.ru/poll/enter/B76mJcZ1LRkNCYeAAojSty'
    },
    "РФЛС": {
        id: 30627,
        federation: 'https://yandex.ru/poll/enter/9uhq1djVi5RPzdbfzdbgGs',
        support: 'https://yandex.ru/poll/enter/EYhekUnYmXY864nH47Djb1'
    },
    "РФОС": {
        id: 30628,
        federation: 'https://yandex.ru/poll/enter/5ds7dfT5GmyrcnaNyUehp7',
        support: 'https://yandex.ru/poll/enter/B7sraQmmFGtMpy2ZZ5AbNC'
    },
    "ОАНКОО/Фауна": {
        id: 30630,
        federation: 'https://yandex.ru/poll/enter/AXxQPxJVazKNZktJSkjHFh',
        support: 'https://yandex.ru/poll/enter/kUKs4Gzija8wsGpoR1QCi'
    },
    "ОАНКОО/РКК": {
        id: 30632,
        federation: 'https://yandex.ru/poll/enter/5orKZHTRjFTdhkR1gNHnZX',
        support: 'https://yandex.ru/poll/enter/XpnjF2hiGAYw691DbHNxnV'
    },
    "ОАНКОО/Элита": {
        id: 30631,
        federation: 'https://yandex.ru/poll/enter/3m4RVPpkBYv1BDZgCeWA5U',
        support: 'https://yandex.ru/poll/enter/ide3ioSZATAGvrg83cczh'
    }
};


const BookformCard = ({url}) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState('');
    const [federation, setFederation] = useState('');
    const [color, setColor] = useState('');

    const handleClick = (e, rkf, destination) => {
        e.preventDefault();
        setShowModal(true);

        if(!destination) {
            setColor('');
            setLink(`https://widget.bookform.ru/${rkf ? 30637 : federation && feds[federation].id}/`);
        } else {
            setColor('_blue');
            setLink(federation && feds[federation][destination]);
        }
    };

    useEffect(() => {
        (() => Request({url},
        data => {
            data && data.short_name && setFederation(data.short_name);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading/> :
        <div className="documents-page__right">
            <Card>
                <div className="documents-page__icon" />
                <h3>ЗАПИСЬ НА ОЧНЫЙ ПРИЕМ</h3>
                <p>В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации или РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность</p>
                <hr />
                <div className="Card__links">
                    {federation && <Link to={`/`} onClick={e => handleClick(e)}>Запись в {federation}</Link>}
                    <Link to={`/`} onClick={e => handleClick(e, true)}>Запись в РКФ</Link>
                </div>
            </Card>
            {federation &&
                <Card>
                    <div className="documents-page__icon" />
                    <h3>ОЦЕНКА РАБОТЫ ФЕДЕРАЦИИ</h3>
                    <p>В данном разделе Вы можете поделиться своими впечатлениями от посещения офиса Вашей федерации и от взаимодействия с ее службой поддержки. Опрос займет всего несколько минут, но пройти его можно не чаще одного раза в месяц, поэтому просим Вас отвечать искренне и быть очень внимательными. Помогите нам стать лучше - нам важно Ваше мнение!</p>
                    <hr />
                    <div className="Card__links">
                        <Link to={`/`} onClick={e => handleClick(e, null, 'federation')}>Оценить работу {federation}</Link>
                        <Link to={`/`} onClick={e => handleClick(e, null, 'support')}>Оценить работу службы поддержки Федерации</Link>
                    </div>
                </Card>
            }
            <Modal showModal={showModal}
                   handleClose={() => {
                       setLink('');
                       setShowModal(false);
                   }}
                   className={`documents-page__modal${color ? ' ' + color : ''}`}
            >
                <iframe src={link}/>
            </Modal>
        </div>
}

export default React.memo(BookformCard);