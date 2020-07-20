import React, { useEffect, useState } from "react";
import NotConfirmed from "../NotConfirmed";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import { Link } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "components/Card";
import UserHeader from "components/redesign/UserHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import UserContacts from "components/redesign/UserContacts";
import UserDescription from "components/redesign/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import ClubUserNews from "./components/ClubUserNews";
import FloatingMenu from './components/FloatingMenu';
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { Gallery } from "components/Gallery";
import "./index.scss";


const ClubPage = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [images, setImages] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + match.params.route
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}`);
            } else {
                setClubInfo(data);
                setNotActiveProfile(isAuthenticated && !is_active_profile);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
        return () => setNeedRequest(true);
    }, [match]);

    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        Request({
            url: `/api/photogallery/gallery?alias=${match.params.route}&elem_count=12`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    thumbnailWidth: 88,
                    thumbnailHeight: p.small_photo.height,
                    caption: p.caption
                }
            }));
        },
            error => {
                //handleError(error);
            });
    }

    const squareStyle = () => {
        return {
            height: '88px',
            width: '88px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    }

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <Card className="club-page__content-banner">
                                        <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                    </Card>
                                    <UserDescription description={clubInfo.description} />
                                    <UserContacts {...clubInfo} />
                                    <div className="club-page__exhibitions">
                                        <ExhibitionsComponent alias={clubInfo.club_alias} />
                                    </div>
                                    {canEdit &&
                                        <AddArticle
                                            id={clubInfo.id}
                                            logo={clubInfo.logo_link}
                                            setPage={setPage}
                                            setNeedRequest={setNeedRequest}
                                        />
                                    }
                                    <ClubUserNews
                                        user="club"
                                        canEdit={canEdit}
                                        alias={match.params.route}
                                        page={page}
                                        setPage={setPage}
                                        needRequest={needRequest}
                                        setNeedRequest={setNeedRequest}
                                    />
                                </div>
                                <Aside className="club-page__info">
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