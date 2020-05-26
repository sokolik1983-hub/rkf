import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import PropertyP from "../../components/PropertyP";
import Loading from "../../components/Loading";
import ExhibitionInfo from "./components/ExhibitionInfo";
import TopComponent from "../../components/TopComponent";
import MenuComponent from "../../components/MenuComponent";
import FloatingMenu from "../Club/components/FloatingMenu";
import ContactsComponent from "../../components/ContactsComponent";
import Disclaimer from "../../components/Disclaimer";
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetExhibition } from "./config";
import { useDictionary, getDictElement } from "../../dictionaries";
import { connectAuthVisible } from "../Login/connectors";
import { DEFAULT_IMG } from "../../appConfig";
import "./index.scss";


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
                        profileId={exhibition.club_id}
                        name={shorten(exhibition.club_information.display_name, 16)}
                        btnName={shorten("Cтраница " + exhibition.club_information.display_name)}
                    />
                    <Container className="content exhibition-page__content">
                        <TopComponent
                            logo={exhibition.club_avatar}
                            name={exhibition.club_information.display_name}
                            canEdit={false}
                        />
                        <div className="exhibition-page__info">
                            <div className="mobile-only">
                                <Disclaimer style={{ marginBottom: '12px' }}>
                                    <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/39/cat/3/#/" target="_blank" rel="noopener noreferrer">
                                        Инструкция по странице выставки
                                    </a>
                                </Disclaimer>
                                <div className="exhibition-page__title-wrap">
                                    <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                    {canEdit && <Link className="btn__blue" to={`/exhibitions/${exhibition.id}/edit`}>Редактировать</Link>}
                                </div>
                                <img src={avatarLink} alt="" className="exhibition-page__img" />
                            </div>
                            <aside className="exhibition-page__left">
                                <MenuComponent
                                    alias={exhibition.club_information.club_alias}
                                    profileId={exhibition.club_id}
                                    name={shorten(exhibition.club_information.display_name)}
                                    btnName={shorten("Cтраница " + exhibition.club_information.display_name)}
                                />
                                <ContactsComponent
                                    full_name={exhibition.club_information.club_legal_name}
                                    legal_address={exhibition.club_information.legal_address}
                                    address={exhibition.club_information.address}
                                    owner_position={exhibition.club_information.owner_position}
                                    owner_name={exhibition.club_information.owner_name}
                                    contacts={exhibition.contacts}
                                    site={exhibition.club_information.site}
                                    work_time={exhibition.club_information.work_time}
                                    ogrn={exhibition.club_information.ogrn}
                                    regdate={exhibition.club_information.registration_date}
                                />
                            </aside>
                            <div className="exhibition-page__right">
                                <div className="desktop-only">
                                    <Disclaimer style={{ marginBottom: '12px' }}>
                                        <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/39/cat/3/#/" target="_blank" rel="noopener noreferrer">
                                            Инструкция по странице выставки
                                    </a>
                                    </Disclaimer>
                                    <div className="exhibition-page__title-wrap">
                                        <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                        {canEdit && <Link className="btn__blue" to={`/exhibitions/${exhibition.id}/edit`}>Редактировать</Link>}
                                    </div>
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
                                        <h4 className="exhibition-page__address-title">Адрес проведения и контакты</h4>
                                        {city && <p>{`г. ${city}`}</p>}
                                        {exhibition.address && <p>{exhibition.address}</p>}
                                        <br />
                                        <h4 className="exhibition-page__address-title">Дополнительная информация</h4>
                                        {exhibition.address_additional_info ?
                                            <p className="exhibition-page__additional-info" dangerouslySetInnerHTML={{ __html: exhibition.address_additional_info }} /> :
                                            <p className="exhibition-page__additional-info">Дополнительная информация отсутствует</p>
                                        }
                                    </div>
                                    <div className="exhibition-page__address-right">
                                        <div className="exhibition-page__map">
                                            <h4 className="exhibition-page__address-title">Схема проезда</h4>
                                            <img src={exhibition.exhibition_map_link || DEFAULT_IMG.noImage} alt="Схема проезда" />
                                        </div>
                                    </div>
                                </Card>
                                <Card className="exhibition-page__payment-info">
                                    <div className="exhibition-page__payment">
                                        <h4 className="exhibition-page__payment-title">Реквизиты для оплаты</h4>
                                        <PropertyP name="Получатель платежа" value={exhibition.club_information.club_legal_name} />
                                        <PropertyP name="ИНН" value={exhibition.club_information.inn} />
                                        <PropertyP name="КПП" value={exhibition.club_information.kpp} />
                                        <PropertyP name="Банк" value={exhibition.club_information.bank_name} />
                                        <PropertyP name="БИК" value={exhibition.club_information.bic} />
                                        <PropertyP name="Расчетный счет" value={exhibition.club_information.account_number} />
                                    </div>
                                    <div className="exhibition-page__additional">
                                        <h4 className="exhibition-page__additional-title">Дополнительная информация</h4>
                                        {exhibition.additional_info ?
                                            <p className="exhibition-page__additional-info" dangerouslySetInnerHTML={{ __html: exhibition.additional_info }} /> :
                                            <p className="exhibition-page__additional-info">Дополнительная информация отсутствует</p>
                                        }
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default connectAuthVisible(React.memo(Exhibition));
