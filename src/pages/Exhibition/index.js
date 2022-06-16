import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { endpointGetExhibition } from "./config";
import ExhibitionInfo from "./components/ExhibitionInfo";
import PageNotFound from "../404";
import { connectAuthVisible } from "../Login/connectors";
import { DEFAULT_IMG, BANNER_TYPES } from "../../appConfig";
import { useDictionary, getDictElement } from "../../dictionaries";
import Card from "../../components/Card";
import Banner from "../../components/Banner";
import Layout from "../../components/Layouts";
import Loading from "../../components/Loading";
import PropertyP from "../../components/PropertyP";
import Container from "../../components/Layouts/Container";
import CopyrightInfo from "../../components/CopyrightInfo";
import PhotoComponent from "../../components/PhotoComponent";
import UserHeader from "../../components/redesign/UserHeader";
import MenuComponentNew from "../../components/MenuComponentNew";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import { Request } from "../../utils/request";
import useIsMobile from "../../utils/useIsMobile";

import "./index.scss";


const urlRegexp = new RegExp(/^((http|https):\/\/?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/);

const checkUrl = (url) => {
    if (urlRegexp.test(url)) {
        return <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
    } else {
        return <span>{url}</span>;
    }
};

const Exhibition = ({ match, isAuthenticated, history, profile_id, is_active_profile }) => {
    const isMobile = useIsMobile(1080);
    const [exhibition, setExhibition] = useState({ club_information: {} });
    const [isError, setIsError] = useState(false);
    const [fedInfo, setFedInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const exhibitionId = match.params.id;
    const { dictionary } = useDictionary('cities');
    const city = exhibition ? getDictElement(dictionary, exhibition.city_id) : null;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.club_id;
    const exhibition_avatar_link = exhibition && exhibition.exhibition_avatar_link;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : DEFAULT_IMG.exhibitionPicture;
    const comments = exhibition && (typeof exhibition.comments === 'string' ? exhibition.comments.split(';').join('\n') : exhibition.comments);
    const dayTimer = exhibition.type_id === 5 ? 5 : 14; // Племенной смотр - 5 дней до подачи отчетов, остальные 14.

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
            new Date(dateEnd).getDate() + dayTimer
        ).toISOString() : null;

    const getExhibition = async() => {
        setLoading(true);

        await Request({
            url: endpointGetExhibition + exhibitionId
        }, data => {
            setExhibition(data);
        }, error => {
            console.log(error.response);
            setIsError(true);
        });

        setLoading(false);
    }

    useEffect(() => {
        getExhibition();
    }, []);

    const {
        additional_info,
        address,
        address_additional_info,
        club_avatar,
        club_information,
        contacts,
        exhibition_map_link,
    } = exhibition;

    const {
        account_number,
        active_member,
        active_rkf_user,
        bank_name,
        bic,
        club_alias,
        club_fact_name,
        club_legal_name,
        display_name,
        federation_alias,
        federation_name,
        inn,
        kpp,
        subscribed,
    } = club_information;

    const onSubscriptionUpdate = (subscribed) => {
        setExhibition({
            ...exhibition,
            club_information: {
                ...club_information,
                subscribed: subscribed
            }
        });
    }

    const getFedInfo = () => {
        Request({
            url: `/api/Club/federation_base_info?alias=` + club_alias
        }, data => {
            setFedInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
        });
    }

    useEffect(() => {
        club_alias && getFedInfo();
    }, [club_alias]);

    return isError
        ? <PageNotFound />
        : loading
            ? <Loading />
            : <Layout>
                <div className="exhibition-page redesign">
                    <Container className="content exhibition-page__content">
                        <div className="exhibition-page__info">
                            <div className="exhibition-page__back-button_wrap">
                                <Link
                                    className="exhibition-page__back-button"
                                    to="#"
                                    onClick={()=> {
                                        history.go(-1);
                                    }}
                                    onTouchStart={()=> {
                                        history.go(-1);
                                    }}
                                >
                                    Назад
                                </Link>
                            </div>
                            <aside className="exhibition-page__left">
                                <StickyBox offsetTop={60}>
                                    <div className="exhibition-page__left-inner">
                                        <UserHeader
                                            canEdit={canEdit}
                                            isAuthenticated={isAuthenticated}
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={club_avatar}
                                            name={display_name || club_fact_name || 'Название клуба отсутствует'}
                                            alias={club_alias}
                                            profileId={club_information.profile_id}
                                            subscribed_id={profile_id}
                                            federationName={federation_name}
                                            federationAlias={federation_alias}
                                            active_member={active_member}
                                            active_rkf_user={active_rkf_user}
                                            subscribed={subscribed}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                        />
                                        {!isMobile && fedInfo && fedInfo.owner_photo &&
                                            <PhotoComponent
                                                photo={fedInfo.owner_photo}
                                                name={fedInfo.owner_name}
                                                position={fedInfo.owner_position}
                                            />
                                        }
                                        {!isMobile &&
                                            <>
                                                <MenuComponentNew />
                                                <Banner type={BANNER_TYPES.exhibitionPageLeftSiteBar} />
                                                <UserPhotoGallery
                                                    alias={club_alias}
                                                    pageLink={`/club/${club_alias}/gallery`}
                                                />
                                            </>
                                        }
                                        <CopyrightInfo withSocials={true} />
                                        <div className="mobile-only">
                                            <div className="exhibition-page__title-wrap">
                                                <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                                {canEdit && new Date(dateEnd) >= new Date() &&
                                                    <Link className="btn__blue"
                                                          to={`/exhibitions/${exhibition.id}/edit`}
                                                    >
                                                        Редактировать
                                                    </Link>
                                                }
                                            </div>
                                            <img src={avatarLink} alt="" className="exhibition-page__img" />
                                        </div>
                                    </div>
                                </StickyBox>
                            </aside>
                            <Card className="exhibition-page__right">
                                <div className="desktop-only">
                                    <div className="exhibition-page__title-wrap">
                                        <h2 className="exhibition-page__title">{exhibition.name}</h2>
                                        {canEdit && new Date(dateEnd) >= new Date() &&
                                            <Link className="btn__blue"
                                                  to={`/exhibitions/${exhibition.id}/edit`}
                                            >
                                                Редактировать
                                            </Link>
                                        }
                                    </div>
                                </div>
                                <ExhibitionInfo
                                    city={city}
                                    dateStart={dateStart}
                                    dateEnd={dateEnd}
                                    reportsDateEnd={reportsDateEnd}
                                    {...exhibition}
                                    comments={comments}
                                    canEdit={canEdit}
                                    exhibitionId={exhibitionId}
                                />
                                <Card className="exhibition-page__address">
                                    <div className="exhibition-page__address-left">
                                        <h4 className="exhibition-page__address-title">Адрес проведения и контакты</h4>
                                        {city && <p>{`г. ${city}`}</p>}
                                        {address && <p>{address}</p>}
                                        <br />

                                    {
                                        contacts && !!contacts.length
                                            ? contacts.sort((a,b) => {
                                                if(a.is_main > b.is_main) return -1
                                                if(a.is_main < b.is_main) return 1
                                                else return 0
                                                }).sort((a, b) => a.contact_type_id - b.contact_type_id).map((item, index) => {
                                                    return item.contact_type_id === 1 ? <p className="exhibition-page__contacts" key={index}>Телефон: <span>{item.value}</span></p> :
                                                        item.contact_type_id === 2 ? <p className="exhibition-page__contacts" key={index}>Email: <a href={`mailto:${item.value}`}>{item.value}</a></p> :
                                                            item.contact_type_id === 3 ? <p className="exhibition-page__contacts" key={index}>Сайт: {checkUrl(item.value)}</p> : null
                                                })
                                            : ''
                                    }
                                        <br />
                                        <h4 className="exhibition-page__address-title">дополнительная информация</h4>
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
                                <div className="exhibition-page__payment-info">
                                    <Card className="exhibition-page__payment">
                                        <h4 className="exhibition-page__payment-title">Реквизиты для оплаты</h4>
                                        <PropertyP name="Получатель платежа" value={club_legal_name} />
                                        <PropertyP name="ИНН" value={inn} />
                                        <PropertyP name="КПП" value={kpp} />
                                        <PropertyP name="Банк" value={bank_name} />
                                        <PropertyP name="БИК" value={bic} />
                                        <PropertyP name="Расчетный счет" value={account_number} />
                                    </Card>
                                    <Card className="exhibition-page__additional">
                                        <h4 className="exhibition-page__additional-title">Дополнительная информация</h4>
                                        {additional_info ?
                                            <p className="exhibition-page__additional-info" dangerouslySetInnerHTML={{ __html: additional_info }} /> :
                                            <p className="exhibition-page__additional-info">Дополнительная информация отсутствует</p>
                                        }
                                    </Card>
                                </div>
                            </Card>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default connectAuthVisible(React.memo(Exhibition));
