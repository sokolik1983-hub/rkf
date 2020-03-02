import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import ExhibitionInfo from "./components/ExhibitionInfo";
import { Request } from "../../utils/request";
import { formatPhone } from "../../utils";
import { endpointGetExhibition } from "./config";
import { useDictionary, getDictElement } from "../../apps/Dictionaries";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const Exhibition = ({ match, isAuthenticated, profile_id, is_active_profile }) => {
    const [shareAlert, setShareAlert] = React.useState(false);

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareAlert(true);
    };

    const shareOk = () => setShareAlert(false);

    const [exhibition, setExhibition] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const exhibitionId = match.params.id;
    const { dictionary } = useDictionary('cities');
    const city = exhibition ? getDictElement(dictionary, exhibition.city_id) : null;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.club_id;
    const dateStart = exhibition && exhibition.dates && exhibition.dates.length ?
        new Date(
            exhibition.dates[0].year,
            exhibition.dates[0].month - 1,
            exhibition.dates[0].day,
            exhibition.dates[0].time_start ? exhibition.dates[0].time_start.slice(0, 2) : 0,
            exhibition.dates[0].time_start ? exhibition.dates[0].time_start.slice(3, 5) : 0
        ).toISOString() : null;
    const dateEnd = exhibition && exhibition.dates && exhibition.dates.length ?
        exhibition.dates.length > 1 ?
            new Date(
                exhibition.dates[exhibition.dates.length - 1].year,
                exhibition.dates[exhibition.dates.length - 1].month - 1,
                exhibition.dates[exhibition.dates.length - 1].day,
                exhibition.dates[exhibition.dates.length - 1].time_end ? exhibition.dates[exhibition.dates.length - 1].time_end.slice(0, 2) : 24,
                exhibition.dates[exhibition.dates.length - 1].time_end ? exhibition.dates[exhibition.dates.length - 1].time_end.slice(3, 5) : 0
            ).toISOString() :
            exhibition.dates[0].time_end ?
                new Date(
                    exhibition.dates[0].year,
                    exhibition.dates[0].month - 1,
                    exhibition.dates[0].day,
                    exhibition.dates[0].time_end.slice(0, 2),
                    exhibition.dates[0].time_end.slice(3, 5)
                ).toISOString() :
                new Date(
                    exhibition.dates[0].year,
                    exhibition.dates[0].month - 1,
                    exhibition.dates[0].day,
                    24,
                    0
                ).toISOString() : null;

    useEffect(() => {
        (() => Request({
            url: endpointGetExhibition + exhibitionId
        }, data => {
            setExhibition(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setIsError(true);
            setLoading(false);
        }))();
    }, []);

    return isError ?
        <PageNotFound /> :
        loading ?
            <Loading /> :
            <Layout>
                <Container className="content exhibition-page">
                    <Card>
                        <div className="exhibition-page__head">
                            <div className="exhibition-page__head-info">
                                <h1 className="exhibition-page__title">{exhibition.name}</h1>
                                <p className="exhibition-page__subtitle">
                                    Организатор:&nbsp;
                                    <Link to={`/${exhibition.club_information.club_alias}`}>
                                        {exhibition.club_information.club_fact_name}
                                    </Link>
                                </p>
                            </div>
                            {canEdit ?
                                <Link className="btn btn-simple" to={`/exhibitions/${exhibitionId}/edit`}>Редактировать</Link> :
                                Date.now() < +new Date(dateStart) && <button className="btn btn-simple" onClick={share}>Поделиться</button>
                            }
                        </div>
                        {shareAlert && (<Alert
                            title="Поделиться"
                            text="Ссылка скопирована в буфер обмена"
                            autoclose={1.5}
                            onOk={shareOk}
                        />)}
                        <ExhibitionInfo city={city} dateStart={dateStart} dateEnd={dateEnd} {...exhibition} />
                        <div className="exhibition-page__payment">
                            <h3 className="exhibition-page__payment-title">Реквизиты для оплаты:</h3>
                            <p>
                                Получатель платежа: {exhibition.club_information.club_legal_name} <br />
                                ИНН: {exhibition.club_information.inn} <br />
                                КПП: {exhibition.club_information.kpp} <br />
                                Банк: {exhibition.club_information.bank_name} <br />
                                БИК: {exhibition.club_information.bic} <br />
                                Расчетный счет: {exhibition.club_information.account_number} <br />
                            </p>
                        </div>
                        <div className="exhibition-page__address">
                            <div className="exhibition-page__address-left">
                                <h3 className="exhibition-page__address-title">Адрес проведения и контакты</h3>
                                {city && <p>{`г. ${city}`}</p>}
                                {exhibition.address && <p>{exhibition.address}</p>}
                                {exhibition.contacts &&
                                    <>
                                        <h4 className="exhibition-page__address-subtitle">Контакты организатора</h4>
                                        {exhibition.contacts.map(contact =>
                                            <p key={contact.id}>
                                                {contact.contact_type_id === 1 ? 'Тел.: ' + formatPhone(contact.value) : 'E-mail: ' + contact.value}
                                            </p>
                                        )}
                                    </>
                                }
                            </div>
                            {exhibition.exhibition_map_link
                                ? <div className="exhibition-page__address-right">
                                    <div className="exhibition-page__map">
                                        <img src={exhibition.exhibition_map_link} alt="Схема проезда" />
                                    </div>
                                    <p>Схема проезда</p>
                                </div>
                                : <div className="exhibition-page__address-right">
                                    <div className="exhibition-page__map">
                                        <h4 className="exhibition-page__map-subtitle">Схема проезда</h4>
                                        <img src="/static/images/noimg/icon-no-image.svg" alt="Схема проезда" />
                                    </div>
                                </div>
                            }
                        </div>
                    </Card>
                </Container>
            </Layout>
};

export default connectAuthVisible(React.memo(Exhibition));
