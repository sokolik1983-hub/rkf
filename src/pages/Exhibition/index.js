import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import ExhibitionInfo from "./components/ExhibitionInfo";
import { Request } from "../../utils/request";
import { endpointGetExhibition } from "./config";
import { useDictionary, getDictElement } from "../../apps/Dictionaries";
import { connectAuthVisible } from "../../apps/Auth/connectors";
import './index.scss';


const Exhibition = ({ match, isAuthenticated, profile_id, is_active_profile }) => {
    const [exhibition, setExhibition] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const exhibitionId = match.params.id;
    const { dictionary } = useDictionary('cities');
    const city = exhibition ? getDictElement(dictionary, exhibition.city_id) : null;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.club_id;

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
                            {canEdit && <Link className="btn btn-simple" to={`/exhibitions/${exhibitionId}/edit`}>Редактировать</Link>}
                        </div>
                        <ExhibitionInfo city={city} {...exhibition} />
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
                                        {exhibition.contacts.map(contact => <p key={contact.id}>{contact.value}</p>)}
                                    </>
                                }
                            </div>
                            {exhibition.exhibition_map_link &&
                                <div className="exhibition-page__address-right">
                                    <div className="exhibition-page__map">
                                        <img src={exhibition.exhibition_map_link} alt="Схема проезда" />
                                    </div>
                                    <p>Схема проезда</p>
                                </div>
                            }
                        </div>
                    </Card>
                </Container>
            </Layout>
};

export default connectAuthVisible(React.memo(Exhibition));