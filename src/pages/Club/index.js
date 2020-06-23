import React, { useEffect, useState } from "react";
import NotConfirmed from "../NotConfirmed";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import { Link } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import MenuComponent from "../../components/MenuComponent";
import Card from "components/Card";
import UserHeader from "../../components/UserHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import ClubInfo from "./components/ClubInfo";
import UserDescription from "../../components/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/UserNews";
import FloatingMenu from './components/FloatingMenu';
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { Gallery } from "components/Gallery";
import { DEFAULT_IMG } from "appConfig";
import "./index.scss";


const ClubPage = ({ match, profile_id, is_active_profile, isAuthenticated }) => {
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
            setClubInfo(data);
            setNotActiveProfile(isAuthenticated && !is_active_profile);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            setLoading(false);
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
            url: `/api/photogallery/gallery`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    width: p.small_photo.width,
                    height: p.small_photo.height,
                    caption: p.caption
                }
            }));
        },
            error => {
                //handleError(error);
            });
    }

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <Container className="content club-page">
                        <UserHeader
                            user="club"
                            logo={clubInfo.logo_link}
                            banner={clubInfo.headliner_link}
                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                            federationName={clubInfo.federation_name}
                            federationAlias={clubInfo.federation_alias}
                            canEdit={canEdit}
                            editLink="/client"
                        />
                        <ExhibitionsComponent alias={clubInfo.club_alias} />
                        <Card className="club-page__gallery-wrap">
                            <h4 className="club-page__gallery-title">
                                <Link className="club-page__gallery-edit" to={`/${clubInfo.club_alias}/gallery`}>Фотогалерея</Link>
                            </h4>
                            {
                                images
                                    ? <Gallery
                                        items={images}
                                        backdropClosesModal={true}
                                        enableImageSelection={false}
                                        maxRows={1}
                                        withLoading={false}
                                    />
                                    : <img className="club-page__gallery-placeholder" alt="" src={DEFAULT_IMG.clubAvatar} />
                            }
                        </Card>
                        <div className="club-page__content-wrap">
                            <div className="club-page__content">
                                <UserDescription description={clubInfo.description} />
                                {canEdit &&
                                    <AddArticle
                                        id={clubInfo.id}
                                        logo={clubInfo.logo_link}
                                        setPage={setPage}
                                        setNeedRequest={setNeedRequest}
                                    />
                                }
                                <UserNews
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
                                <MenuComponent
                                    alias={clubInfo.club_alias}
                                    profileId={clubInfo.id}
                                    name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                                />
                                <ClubInfo {...clubInfo} />
                            </Aside>
                        </div>
                        <FloatingMenu
                            alias={clubInfo.club_alias}
                            profileId={clubInfo.id}
                            name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                        />
                    </Container>
                </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));