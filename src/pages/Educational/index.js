import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import PropertyP from "../../components/PropertyP";
import Loading from "../../components/Loading";
import ExhibitionInfo from "./components/ExhibitionInfo";
import CopyrightInfo from "../../components/CopyrightInfo";
import { Request } from "../../utils/request";
import { endpointGetExhibition } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { BANNER_TYPES } from "../../appConfig";
import UserHeader from "../../components/redesign/UserHeader";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import StickyBox from "react-sticky-box";
import Banner from "../../components/Banner";
import { isFederationAlias } from "../../utils";
import { clubNav } from "../Club/config";
import UserMenu from "../../components/Layouts/UserMenu";
import MenuComponent from "../../components/MenuComponent";
import SignUpModal from "./components/SignUpModal";
import useIsMobile from "../../utils/useIsMobile";

import "./index.scss";

const Exhibition = ({ match, isAuthenticated, profile_id, is_active_profile }) => {
    const [exhibition, setExhibition] = useState({ club_information: {} });
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const exhibitionId = match.params.id;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.club_id;
    const comments = exhibition && (typeof exhibition.comments === 'string' ? exhibition.comments.split(';').join('\n') : exhibition.comments);
    const isMobile = useIsMobile(1080);
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
            url: `${endpointGetExhibition}?id=${exhibitionId}`
        }, data => {
            setExhibition(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setIsError(true);
            setLoading(false);
        }))();
    }, []);

    const { id,
        organizer_name,
        organizer_alias,
        federation_name,
        organizer_logo,
        picture_link,
        date_begin,
        inn,
        kpp,
        bic,
        bank_name,
        account_number,
        registration_show } = exhibition;

    return isError
        ? <PageNotFound />
        : loading
            ? <Loading />
            : <Layout>
                <div className="educational-page redesign">
                    <Container className="content educational-page__content">
                        <div className="educational-page__info">
                            <aside className="educational-page__left">
                                <StickyBox offsetTop={65}>
                                    <div className="educational-page__left-inner">
                                        <div className="mobile-only">
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={organizer_logo}
                                                name={organizer_name || 'Название отсутствует'}
                                                alias={organizer_alias}
                                                profileId={id}
                                                federationName={organizer_name}
                                                federationAlias={organizer_alias}
                                            />
                                        </div>
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={organizer_logo}
                                            name={organizer_name || 'Название отсутствует'}
                                            alias={organizer_alias}
                                            profileId={id}
                                            federationName={organizer_name}
                                            federationAlias={organizer_alias}
                                        />
                                        {!isMobile && isFederationAlias(organizer_alias) ?
                                            <MenuComponent
                                                alias={organizer_alias}
                                                name={federation_name || ''}
                                                isFederation={true}
                                            />
                                            :
                                            <UserMenu
                                                userNav={clubNav(organizer_alias)}
                                                isExhibitionPage={true}
                                            />
                                        }
                                        <Banner type={BANNER_TYPES.exhibitionPageLeftSiteBar} />
                                        <UserPhotoGallery
                                            alias={organizer_alias}
                                            pageLink={`/${organizer_alias}/gallery`}
                                        />
                                        <CopyrightInfo withSocials={true} />
                                        <div className="mobile-only">
                                            <div className="educational-page__title-wrap">
                                                <h2 className="educational-page__title">{exhibition.name}</h2>
                                                {canEdit && <Link className="btn__blue" to={`/exhibitions/${exhibition.id}/edit`}>Редактировать</Link>}
                                            </div>
                                            <img src={picture_link} alt="" className="educational-page__img" />
                                        </div>
                                    </div>
                                </StickyBox>
                            </aside>
                            <div className="educational-page__right">
                                <div className="desktop-only">
                                    <div className="educational-page__title-wrap">
                                        <h2 className="educational-page__title">{exhibition.name}</h2>
                                        {canEdit && <Link className="btn__blue" to={`/exhibitions/${exhibition.id}/edit`}>Редактировать</Link>}
                                    </div>
                                    <img src={picture_link} alt="" className="educational-page__img" />
                                </div>
                                <ExhibitionInfo
                                    dateStart={date_begin}
                                    dateEnd={dateEnd}
                                    {...exhibition}
                                    comments={comments}
                                />
                                <Card className="educational-page__payment-info">
                                    <div className="educational-page__payment">
                                        <h4 className="educational-page__payment-title">Реквизиты для оплаты</h4>
                                        {/* <PropertyP name="Получатель платежа" value={club_legal_name} /> */}
                                        <PropertyP name="ИНН" value={inn} />
                                        <PropertyP name="КПП" value={kpp} />
                                        <PropertyP name="Банк" value={bank_name} />
                                        <PropertyP name="БИК" value={bic} />
                                        <PropertyP name="Расчетный счет" value={account_number} />
                                    </div>
                                </Card>
                                {
                                    registration_show && <Card className="educational-page__sign-up">
                                        <button onClick={() => setShowModal(true)} className="btn btn-primary">Записаться на мероприятие</button>
                                    </Card>
                                }
                            </div>
                        </div>
                    </Container>
                </div>
                {showModal &&
                    <SignUpModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        title={exhibition.name}
                        id={exhibition.id}
                    />
                }
            </Layout>
};

export default connectAuthVisible(React.memo(Exhibition));