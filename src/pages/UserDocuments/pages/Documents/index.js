import React from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "../../../../components/Card";
import ls from "local-storage";
import StickyBox from "react-sticky-box";
import MenuComponentNew from "../../../../components/MenuComponentNew";
import Banner from "../../../../components/Banner";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import Container from "../../../../components/Layouts/Container";
import useIsMobile from "../../../../utils/useIsMobile";
import CardMessage from "../../../../components/CardMessage";

import "./index.scss";


const Documents = ({ alias }) => {
    const location = useLocation();
    const isMobile = useIsMobile(1080);

    return (
        <Container className="user-documents__content">
            { location.pathname.indexOf(`/user/${ ls.get('user_info').alias }/documents`) !== -1 &&
            <aside className="user-documents__left">
                <StickyBox offsetTop={ 60 }>
                    { !isMobile && <MenuComponentNew/> }
                    { !isMobile && <Banner type={ 10 }/> }
                    <CopyrightInfo withSocials={ true }/>
                </StickyBox>
            </aside> }

            <div className="user-documents__right">
                <CardMessage>
                    <h3>Уважаемые пользователи портала RKF.ONLINE!</h3>
                    <p>Ввиду того, что некоторые посетители офиса РКФ регулярно пропускают время своей записи,
                        не отменив ее и не освободив тем самым «окно» для других желающих, мы вынуждены ввести
                        ограничительные меры. Если в течение 30 календарных дней вы трижды пропустили запись
                        на посещение офиса РКФ и не отменили ее в личном кабинете, на следующие 30 дней
                        возможность зарегистрироваться на прием будет для вас ограничена.
                        Просим своевременно отменять запись в случае невозможности ею воспользоваться!</p>
                </CardMessage>
                <div className="user-documents__cards">
                    <Card className="documents-card">
                        <div className="documents-card__icon _dysplasia"/>
                        <h3 className="documents-card__title">Сертификат о проверке на дисплазию</h3>
                        <p className="documents-card__about">Для изготовления и получения сертификата о проверке на
                            дисплазию HD
                            и ED необходимо подать заявку, прикрепив договор с печатью ветеринарного учреждения и
                            подписью
                            ветеринарного врача, а также рентгенограмму. Плановый срок изготовления сертификата
                            составляет
                            два
                            месяца со дня подачи документов в РКФ. После изготовления сертификата результаты
                            исследования
                            автоматически вносятся в электронную базу РКФ и в дальнейшем отражаются в родословных
                            потомков
                            собаки.</p>
                        <div className="documents-card__controls">
                            <Link
                                to={ `/user/${ alias }/documents/dysplasia/form` }
                                className="documents-card__link"
                            >
                                Подать заявку
                            </Link>
                            <Link
                                to={ `/user/${ alias }/documents/dysplasia/registry` }
                                className="documents-card__link"
                            >
                                Проверка статуса документов
                            </Link>
                        </div>
                    </Card>
                    <Card className="documents-card">
                        <div className="documents-card__icon _patella"/>
                        <h3 className="documents-card__title">Сертификат клинической оценки коленных суставов (PL)
                            (Пателла)</h3>
                        <p className="documents-card__about">Для оформления сертфиката клинической оценки коленных
                            суставов необходимо обратиться к любому ветеринарному врачу РКФ, лицензированному в системе
                            FCI в качестве специалиста, имеющего право оценки состояния коленных суставов (PL) с выдачей
                            сертификата установленного образца.</p>
                        <div className="documents-card__controls">
                            <Link
                                to={ `/user/${ alias }/documents/patella/form` }
                                className="documents-card__link"
                            >
                                Подать заявку
                            </Link>
                            <Link
                                to={ `/user/${ alias }/documents/patella/registry` }
                                className="documents-card__link"
                            >
                                Проверка статуса документов
                            </Link>
                        </div>
                    </Card>
                    <Card className="documents-card">
                        <div className="documents-card__icon _litter"/>
                        <h3 className="documents-card__title">Заявка на получение документов РКФ</h3>
                        <p className="documents-card__about">В данном разделе Вы можете оформить заявки на получение
                            следующих документов: дипломы чемпионов, дипломы победителей, племенные сертификаты, рабочие
                            сертификаты. После изготовления диплома/сертификата данные автоматически заносятся в
                            электронную базу РКФ.</p>
                        <div className="documents-card__controls">
                            <Link
                                to={ `/user/${ alias }/documents/application/form` }
                                className="documents-card__link"
                            >
                                Подать заявку
                            </Link>
                            <Link
                                to={ `/user/${ alias }/documents/application/registry` }
                                className="documents-card__link"
                            >
                                Проверка статуса документов
                            </Link>
                        </div>
                    </Card>
                    <Card className="documents-card">
                        <div className="documents-card__icon _events"/>
                        <h3 className="documents-card__title">ПРИГЛАШЕНИЯ СУДЕЙ НА МЕРОПРИЯТИЯ</h3>
                        <p className="documents-card__about">
                            В данном разделе НКП предоставлена возможность согласовать судей на мероприятия, после
                            согласования их списка со стороны клуба, который проводит выставку
                        </p>
                        <div className="documents-card__controls">
                            <Link to={ `/user/${ alias }/documents/exhibitions/invite/registry` }
                                  className="documents-card__link"
                            >
                                Реестр заявок
                            </Link>
                        </div>
                    </Card>
            </div>
        </div>
</Container>
)
};

export default React.memo(Documents);