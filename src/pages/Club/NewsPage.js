import React, { useEffect, useState } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import { Link } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import UserHeader from "../../components/redesign/UserHeader";
import AddArticle from "../../components/UserAddArticle";
import FloatingMenu from "./components/FloatingMenu";
import ClubUserNews from "./components/ClubUserNews";
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { Gallery } from "../../components/Gallery";
import StickyBox from "react-sticky-box";
import "./index.scss";


const ClubPage = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [images, setImages] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    const alias = match.params.route;

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if(data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setClubInfo(data);
                setCanEdit(isAuthenticated && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [match]);


    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        Request({
            url: `/api/photogallery/gallery?alias=${match.params.route}&elem_count=12`,
            method: 'GET'
        }, data => {
            if (data.photos.length) {
                const twelveItemsArray = Array.apply(null, Array(12)).map((x, i) => i);
                const { photos } = data;
                const imagesArray = twelveItemsArray.map(p => {
                    if (photos[p]) {
                        return {
                            id: photos[p].id,
                            src: photos[p].link,
                            thumbnail: photos[p].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[p].caption
                        }
                    } else {
                        return {
                            id: p,
                            src: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnail: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnailWidth: 88,
                            thumbnailHeight: 88
                        }
                    }
                });
                setImages(imagesArray);
            }
        },
        error => {
            //handleError(error);
        });
    }

    const squareStyle = () => {
        return {
            height: '89px',
            width: '89px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    }

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
                <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <Card className="club-page__content-banner">
                                        <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                    </Card>
                                    <div className="club-page__mobile-only">
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                        />
                                    </div>
                                    <ClubUserNews
                                        user="club"
                                        canEdit={canEdit}
                                        alias={match.params.route}
                                        needRequest={needRequest}
                                        setNeedRequest={setNeedRequest}
                                    />
                                    <div className="club-page__mobile-only">
                                        <Card className="club-page__gallery-wrap">
                                            <div className="club-page__gallery-header">
                                                <h4 className="club-page__gallery-title">Фотогалерея</h4>
                                                <Link to={`/${clubInfo.club_alias}/gallery`}>Смотреть все</Link>
                                            </div>
                                            <Gallery
                                                items={images}
                                                backdropClosesModal={true}
                                                enableImageSelection={false}
                                                withLoading={false}
                                                rowHeight={89}
                                                thumbnailStyle={squareStyle}
                                            />
                                        </Card>
                                    </div>
                                    {canEdit &&
                                        <AddArticle
                                            id={clubInfo.id}
                                            logo={clubInfo.logo_link}
                                            setNeedRequest={setNeedRequest}
                                        />
                                    }
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="club-page__info-inner">
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                            />
                                            <Card className="club-page__gallery-wrap">
                                                <div className="club-page__gallery-header">
                                                    <h4 className="club-page__gallery-title">Фотогалерея</h4>
                                                    <Link to={`/${clubInfo.club_alias}/gallery`}>Смотреть все</Link>
                                                </div>
                                                <Gallery
                                                    items={images}
                                                    backdropClosesModal={true}
                                                    enableImageSelection={false}
                                                    withLoading={false}
                                                    rowHeight={88}
                                                    thumbnailStyle={squareStyle}
                                                />
                                            </Card>
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                            <FloatingMenu
                                alias={clubInfo.club_alias}
                                profileId={clubInfo.id}
                                name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                            />
                        </Container>
                    </div>
                </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));