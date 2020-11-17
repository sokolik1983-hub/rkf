import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";


const Documents = ({ alias }) => (
    <>
        <Card className="documents-card">
            <div className="documents-card__icon _dysplasia" />
            <h3 className="documents-card__title">Сертификат о проверке на дисплазию</h3>
            <p className="documents-card__about">Для изготовления и получения сертификата о проверке на дисплазию HD и ED необходимо подать заявку, прикрепив договор с печатью ветеринарного учреждения и подписью ветеринарного врача, а также рентгенограмму. Плановый срок изготовления сертификата составляет два месяца со дня подачи документов в РКФ. После изготовления сертификата результаты исследования автоматически вносятся в электронную базу РКФ и в дальнейшем отражаются в родословных потомков собаки.</p>
            <div className="documents-card__controls">
                <div className="documents-card__controls-links">
                    <Link
                        to={`/user/${alias}/documents/dysplasia/form`}
                        className="documents-card__link"
                    >Подать заявку</Link>
                    <Link
                        to={`/user/${alias}/documents/dysplasia/registry`}
                        className="documents-card__link"
                    >Реестр</Link>
                </div>
                <Link
                    to="/"
                    className="documents-card__link _disabled"
                    onClick={e => e.preventDefault()}
                >Подробнее...</Link>
            </div>
        </Card>
        <Card className="documents-card">
            <div className="documents-card__icon _patella" />
            <h3 className="documents-card__title">Сертификат клинической оценки коленных суставов (PL) (Пателла)</h3>
            <p className="documents-card__about">Для оформления сертфиката клинической оценки коленных суставов необходимо обратиться к любому ветеринарному врачу РКФ, лицензированному в системе FCI в качестве специалиста, имеющего право оценки состояния коленных суставов (PL) с выдачей сертификата установленного образца.</p>
            <div className="documents-card__controls">
                <div className="documents-card__controls-links">
                    <Link
                        to={`/user/${alias}/documents/patella/form`}
                        className="documents-card__link"
                    >Подать заявку</Link>
                    <Link
                        to={`/user/${alias}/documents/patella/registry`}
                        className="documents-card__link"
                    >Реестр</Link>
                </div>
                <Link
                    to="/"
                    className="documents-card__link _disabled"
                    onClick={e => e.preventDefault()}
                >Подробнее...</Link>
            </div>
        </Card>
    </>
);

export default React.memo(Documents);