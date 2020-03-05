import React, { useEffect, useState } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import ExhibitionInfo from "./components/ExhibitionInfo";
import TopComponent from "../../components/TopComponent";
import MenuComponent from "../../components/MenuComponent";
import FloatingMenu from "../Club/components/FloatingMenu";
import ContactsComponent from "../../components/ContactsComponent";
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetExhibition } from "./config";
import { useDictionary, getDictElement } from "../../apps/Dictionaries";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";
import { DEFAULT_IMG } from "../../appConfig";


const Exhibition = ({ match, isAuthenticated, profile_id, is_active_profile }) => {
    const [exhibition, setExhibition] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const exhibitionId = match.params.id;
    const { dictionary } = useDictionary('cities');
    const city = exhibition ? getDictElement(dictionary, exhibition.city_id) : null;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.club_id;
    const exhibition_avatar_link = exhibition && exhibition.exhibition_avatar_link;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : DEFAULT_IMG.exhibitionPicture;
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
    const reportsDateEnd = dateEnd ?
        new Date(
            new Date(dateEnd).getFullYear(),
            new Date(dateEnd).getMonth(),
            new Date(dateEnd).getDate() + 14
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
                <div className="exhibition-page">
                    <FloatingMenu
                        alias={exhibition.club_information.club_alias}
                        name={shorten(exhibition.club_information.club_fact_name, 16)}
                        btnName={shorten("Cтраница " + exhibition.club_information.club_fact_name)}
                    />
                    <Container className="content exhibition-page__content">
                            {/*<div className="exhibition-page__head">
                                <div className="exhibition-page__head-info">
                                    <h1 className="exhibition-page__title">{exhibition.name}</h1>
                                    <p className="exhibition-page__subtitle">
                                        Организатор:&nbsp;
                                        <Link to={`/${exhibition.club_information.club_alias}`}>
                                            {exhibition.club_information.club_fact_name}
                                        </Link>
                                    </p>
                                </div>
                                {canEdit &&
                                    <Link className="btn btn-simple" to={`/exhibitions/${exhibitionId}/edit`}>Редактировать</Link>
                                }
                                <button className="btn btn-simple" onClick={share}>Поделиться</button>
                            </div>
                            */}
                            <TopComponent
                                logo={exhibition.club_information.club_logo}
                                name={exhibition.club_information.club_fact_name}
                                canEdit={canEdit && `/exhibitions/${exhibitionId}/edit`}
                            />
                            <div className="exhibition-page__info">
                                <div className="mobile-only">
                                    <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                    <img src={avatarLink} alt="" className="exhibition-page__img" />
                                </div>
                                <aside className="exhibition-page__left">
                                    <MenuComponent
                                        alias={exhibition.club_information.club_alias}
                                        name={shorten(exhibition.club_information.club_fact_name)}
                                        btnName={shorten("Cтраница " + exhibition.club_information.club_fact_name)}
                                    />
                                    <ContactsComponent
                                        address={exhibition.address}
                                        owner_name={exhibition.club_information.owner_name}
                                        contacts={exhibition.contacts}
                                        ogrn={exhibition.club_information.ogrn}
                                        regdate={exhibition.club_information.registration_date}
                                    />
                                </aside>
                                <div className="exhibition-page__right">
                                    <div className="desktop-only">
                                        <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                        <img src={exhibition.exhibition_avatar_link} alt="" className="exhibition-page__img" />
                                    </div>
                                    <ExhibitionInfo
                                        city={city}
                                        dateStart={dateStart}
                                        dateEnd={dateEnd}
                                        reportsDateEnd={reportsDateEnd}
                                        {...exhibition}
                                    />
                                    <Card className="exhibition-page__address">
                                        <div className="exhibition-page__address-left">
                                            <h3 className="exhibition-page__address-title">Адрес проведения и контакты</h3>
                                            {city && <p>{`г. ${city}`}</p>}
                                            {exhibition.address && <p>{exhibition.address}</p>}
                                        </div>
                                        <div className="exhibition-page__address-right">
                                            <div className="exhibition-page__map">
                                                <h3 className="exhibition-page__address-title">Схема проезда</h3>
                                                <img src={exhibition.exhibition_map_link || DEFAULT_IMG.noImage} alt="Схема проезда" />
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="exhibition-page__payment">
                                        <h3 className="exhibition-page__payment-title">Реквизиты для оплаты:</h3>
                                        <p>
                                            Получатель платежа: {exhibition.club_information.club_legal_name} <br />
                                            ИНН: {exhibition.club_information.inn} <br />
                                            КПП: {exhibition.club_information.kpp} <br />
                                            Банк: {exhibition.club_information.bank_name} <br />
                                            БИК: {exhibition.club_information.bic} <br />
                                            Расчетный счет: {exhibition.club_information.account_number} <br />
                                        </p>
                                    </Card>
                                </div>
                            </div>
                    </Container>
                </div>
            </Layout>
};

export default connectAuthVisible(React.memo(Exhibition));
