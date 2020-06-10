import React, {useEffect, useState} from "react";
import Card from "components/Card";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import Modal from "components/Modal";
import {Request} from "utils/request";
import "./index.scss";

const feds = {
    "РФСС": 30629,
    "РФЛС": 30627,
    "РФОС": 30628,
    "ОАНКОО/Фауна": 30630,
    "ОАНКОО/РКК": 30632,
    "ОАНКОО/Элита": 30631
}


const BookformCard = ({url}) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [widgetId, setWidgetId] = useState(false);
    const [federation, setFederation] = useState('');
    const handleClick = (e, rkf) => {
        e.preventDefault();
        setShowModal(true);
        setWidgetId(rkf ? 30637 : federation && feds[federation]);
    }
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

    return loading ? <Loading/> : <Card>
            <div className="documents-page__icon" />
            <h3>ЗАПИСЬ НА ОЧНЫЙ ПРИЕМ</h3>
            <p>В данном разделе Вы можете записаться на очный прием в офисе Вашей федерации или РКФ. Для этого выберете дату и время посещения, а также тип услуги, которая Вас интересует. После подтверждения записи на Ваш e-mail будет отправлено письмо с датой и временем Вашей записи, которое необходимо будет предъявить на входе. При посещении офиса необходимо иметь с собой документ, удостоверяющий личность</p>
            <hr />
            <div className="Card__links">
                {federation && <Link to={`/`} onClick={e => handleClick(e)}>Запись в {federation}</Link>}
                <Link to={`/`} onClick={e => handleClick(e, true)}>Запись в РКФ</Link>
            </div>
            <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
                <iframe src={`https://widget.bookform.ru/${widgetId}/`}/>
            </Modal>
        </Card>
}

export default React.memo(BookformCard);
