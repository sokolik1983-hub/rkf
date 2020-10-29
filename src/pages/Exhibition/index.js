import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import PropertyP from "../../components/PropertyP";
import Loading from "../../components/Loading";
import ExhibitionInfo from "./components/ExhibitionInfo";
import FloatingMenu from "../Club/components/FloatingMenu";
import Disclaimer from "../../components/Disclaimer";
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetExhibition } from "./config";
import { useDictionary, getDictElement } from "../../dictionaries";
import { connectAuthVisible } from "../Login/connectors";
import { DEFAULT_IMG,BANNER_TYPES } from "../../appConfig";
import UserHeader from "../../components/redesign/UserHeader";
import UserGallery from "../../components/redesign/UserGallery";
import StickyBox from "react-sticky-box";
import Banner from "../../components/Banner";
import "./index.scss";


const Exhibition = ({ match, isAuthenticated, profile_id, is_active_profile }) => {
    const [exhibition, setExhibition] = useState({ club_information: {} });
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const exhibitionId = match.params.id;
    const { dictionary } = useDictionary('cities');
    const city = exhibition ? getDictElement(dictionary, exhibition.city_id) : null;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.club_id;
    const exhibition_avatar_link = exhibition && exhibition.exhibition_avatar_link;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : DEFAULT_IMG.exhibitionPicture;
    const comments = exhibition && (typeof exhibition.comments === 'string' ? exhibition.comments.split(';').join('\n') : exhibition.comments);
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

    const dayTimer = exhibition.type_id === 5 ? 5 : 14; // Племенной смотр - 5 дней до подачи отчетов, остальные 14.

    const reportsDateEnd = dateEnd ?
        new Date(
            new Date(dateEnd).getFullYear(),
            new Date(dateEnd).getMonth(),
            new Date(dateEnd).getDate() + dayTimer
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

    const { club_information,
        club_avatar,
        club_id,
        address,
        address_additional_info,
        additional_info,
        exhibition_map_link } = exhibition;
    const { club_alias,
        display_name,
        club_fact_name,
        id,
        federation_name,
        federation_alias,
        headliner_link,
        club_legal_name,
        inn,
        kpp,
        bank_name,
        bic,
        account_number } = club_information;

    return isError
        ? <PageNotFound />
        : loading
            ? <Loading />
            : <Layout>
                <div className="exhibition-page redesign">
                    <FloatingMenu
                        alias={club_alias}
                        profileId={club_id}
                        name={shorten(display_name, 16)}
                        btnName={shorten("Cтраница " + display_name)}
                    />
                    <Container className="content exhibition-page__content">
                        <div className="exhibition-page__info">
                            <aside className="exhibition-page__left">
                                <StickyBox offsetTop={65}>
                                    <div className="exhibition-page__left-inner">
                                        <div className="mobile-only">
                                            <Card className="exhibition-page__banner">
                                                <div style={headliner_link && { backgroundImage: `url(${headliner_link}` }} />
                                            </Card>
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={club_avatar}
                                                name={display_name || club_fact_name || 'Название клуба отсутствует'}
                                                alias={club_alias}
                                                profileId={id}
                                                federationName={federation_name}
                                                federationAlias={federation_alias}
                                            />
                                        </div>
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={club_avatar}
                                            name={display_name || club_fact_name || 'Название клуба отсутствует'}
                                            alias={club_alias}
                                            profileId={id}
                                            federationName={federation_name}
                                            federationAlias={federation_alias}
                                        />
                                        <Banner type = {BANNER_TYPES.exhibitionPageLeftSiteBar}/>
                                        <UserGallery alias={club_alias} />
                                        <div className="exhibition-page__copy-wrap">
                                            <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                            <p>Политика обработки персональных данных</p>
                                        </div>

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

                                    </div>
                                </StickyBox>
                            </aside>
                            <div className="exhibition-page__right">
                                <div className="desktop-only">
                                    <Card className="exhibition-page__banner">
                                        <div style={headliner_link && { backgroundImage: `url(${headliner_link}` }} />
                                    </Card>
                                    <Disclaimer style={{ marginBottom: '12px' }}>
                                        <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/39/cat/3/#/" target="_blank" rel="noopener noreferrer">
                                            Инструкция по странице выставки
                                    </a>
                                    </Disclaimer>
                                    <div className="exhibition-page__title-wrap">
                                        <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                        {canEdit && <Link className="btn__blue" to={`/exhibitions/${exhibition.id}/edit`}>Редактировать</Link>}
                                    </div>
                                    <img src={exhibition_avatar_link} alt="" className="exhibition-page__img" />
                                </div>
                                <ExhibitionInfo
                                    city={city}
                                    dateStart={dateStart}
                                    dateEnd={dateEnd}
                                    reportsDateEnd={reportsDateEnd}
                                    {...exhibition}
                                    comments={comments}
                                />
                                <Card className="exhibition-page__address">
                                    <div className="exhibition-page__address-left">
                                        <h4 className="exhibition-page__address-title">Адрес проведения и контакты</h4>
                                        {city && <p>{`г. ${city}`}</p>}
                                        {address && <p>{address}</p>}
                                        <br />
                                        <h4 className="exhibition-page__address-title">Дополнительная информация</h4>
                                        {address_additional_info ?
                                            <p className="exhibition-page__additional-info" dangerouslySetInnerHTML={{ __html: address_additional_info }} /> :
                                            <p className="exhibition-page__additional-info">Дополнительная информация отсутствует</p>
                                        }
                                    </div>
                                    <div className="exhibition-page__address-right">
                                        <div className="exhibition-page__map">
                                            <h4 className="exhibition-page__address-title">Схема проезда</h4>
                                            <img src={exhibition_map_link || DEFAULT_IMG.noImage} alt="Схема проезда" />
                                        </div>
                                    </div>
                                </Card>
                                <Card className="exhibition-page__payment-info">
                                    <div className="exhibition-page__payment">
                                        <h4 className="exhibition-page__payment-title">Реквизиты для оплаты</h4>
                                        <PropertyP name="Получатель платежа" value={club_legal_name} />
                                        <PropertyP name="ИНН" value={inn} />
                                        <PropertyP name="КПП" value={kpp} />
                                        <PropertyP name="Банк" value={bank_name} />
                                        <PropertyP name="БИК" value={bic} />
                                        <PropertyP name="Расчетный счет" value={account_number} />
                                    </div>
                                    <div className="exhibition-page__additional">
                                        <h4 className="exhibition-page__additional-title">Дополнительная информация</h4>
                                        {additional_info ?
                                            <p className="exhibition-page__additional-info" dangerouslySetInnerHTML={{ __html: additional_info }} /> :
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
