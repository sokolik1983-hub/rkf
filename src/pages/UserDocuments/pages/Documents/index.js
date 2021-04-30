import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import CardMessage from "../../../../components/CardMessage";


const Documents = ({ alias }) => (
    <>
        <CardMessage>
            <h3>Уважаемые пользователи!</h3>
            <p>Обращаем ваше внимание, что в майские праздники и с 4 по 7 мая 2021 года, официально объявленные нерабочими днями, согласно указу Президента РФ, заявки обрабатываться не будут. Заявки, поданные в период с 01 по 10 мая 2021 года сотрудники РКФ начнут обрабатывать только 11 мая 2021 года.</p>
        </CardMessage>
        <Card className="documents-card">
            <div className="documents-card__icon _dysplasia" />
            <h3 className="documents-card__title">Сертификат о проверке на дисплазию</h3>
            <p className="documents-card__about">Для изготовления и получения сертификата о проверке на дисплазию HD и ED необходимо подать заявку, прикрепив договор с печатью ветеринарного учреждения и подписью ветеринарного врача, а также рентгенограмму. Плановый срок изготовления сертификата составляет два месяца со дня подачи документов в РКФ. После изготовления сертификата результаты исследования автоматически вносятся в электронную базу РКФ и в дальнейшем отражаются в родословных потомков собаки.</p>
            <div className="documents-card__controls">
                <Link
                    to={`/user/${alias}/documents/dysplasia/form`}
                    className="documents-card__link"
                >Подать заявку</Link>
                <Link
                    to={`/user/${alias}/documents/dysplasia/registry`}
                    className="documents-card__link"
                >Проверка статуса документов</Link>
            </div>
        </Card>
        <Card className="documents-card">
            <div className="documents-card__icon _patella" />
            <h3 className="documents-card__title">Сертификат клинической оценки коленных суставов (PL) (Пателла)</h3>
            <p className="documents-card__about">Для оформления сертфиката клинической оценки коленных суставов необходимо обратиться к любому ветеринарному врачу РКФ, лицензированному в системе FCI в качестве специалиста, имеющего право оценки состояния коленных суставов (PL) с выдачей сертификата установленного образца.</p>
            <div className="documents-card__controls">
                <Link
                    to={`/user/${alias}/documents/patella/form`}
                    className="documents-card__link"
                >Подать заявку</Link>
                <Link
                    to={`/user/${alias}/documents/patella/registry`}
                    className="documents-card__link"
                >Проверка статуса документов</Link>
            </div>
        </Card>
        <Card className="documents-card">
            <div className="documents-card__icon _litter" />
            <h3 className="documents-card__title">Заявка на получение документов РКФ</h3>
            <p className="documents-card__about">В данном разделе Вы можете оформить заявки на получение следующих документов: дипломы чемпионов, дипломы победителей, племенные сертификаты, рабочие сертификаты. После изготовления диплома/сертификата данные автоматически заносятся в электронную базу РКФ.</p>
            <div className="documents-card__controls">
                <Link
                    to={`/user/${alias}/documents/application/form`}
                    className="documents-card__link"
                >Подать заявку</Link>
                <Link
                    to={`/user/${alias}/documents/application/registry`}
                    className="documents-card__link"
                >Проверка статуса документов</Link>
            </div>
        </Card>
    </>
);

export default React.memo(Documents);