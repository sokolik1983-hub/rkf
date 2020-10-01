import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";


const Specialization = ({alias}) => (
    <>
        <Card className="documents-card">
            <div className="documents-card__icon _judge" />
            <h3 className="documents-card__title">Статус судьи РКФ</h3>
            <p className="documents-card__about">Для закрепления за пользователем статуса судьи РКФ необходимо подать соответствующую заявку, в которой будут указаны данные регистрационных документов выданных РКФ и подтверждающих судейскую квалификацию заявителя. Данные о присвоенной квалификации можно посмотреть в разделе "Подробнее..."</p>
            <div className="documents-card__controls">
                <Link
                    to="/"
                    className="documents-card__link _disabled"
                    onClick={e => e.preventDefault()}
                >Подать заявку</Link>
                <Link
                    to="/"
                    className="documents-card__link _disabled"
                    onClick={e => e.preventDefault()}
                >Подробнее...</Link>
            </div>
        </Card>
        <Card className="documents-card">
            <div className="documents-card__icon _specialist" />
            <h3 className="documents-card__title">Статус специалиста</h3>
            <p className="documents-card__about">Если Вы являетесь грумером, хэндлером или специалистом в другой области и предоставляете услуги владельцем собак - Вы можете подать заявку на присвоение соответствующего статуса онлайн. Для этого необходимо указать информацию о себе и данные о Вашей специализации. Детальную информацию о присвоенных статусах Вы можете посмотреть в разделе "Подробнее..."</p>
            <div className="documents-card__controls">
                <Link
                    to="/"
                    className="documents-card__link _disabled"
                    onClick={e => e.preventDefault()}
                >Подать заявку</Link>
                <Link
                    to="/"
                    className="documents-card__link _disabled"
                    onClick={e => e.preventDefault()}
                >Подробнее...</Link>
            </div>
        </Card>
    </>
);

export default React.memo(Specialization);