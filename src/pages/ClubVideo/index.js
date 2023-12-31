import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StickyBox from "react-sticky-box";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Aside from "components/Layouts/Aside";
import Loading from "components/Loading";
import Card from "components/Card";
import Alert from "components/Alert";
import CopyrightInfo from "../../components/CopyrightInfo";
import UserHeader from "../../components/redesign/UserHeader";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import { VideoGallery } from "components/Gallery";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import { DEFAULT_IMG } from "appConfig";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./styles.scss";
import "pages/Club/index.scss";

const ClubVideo = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [fedInfo, setFedInfo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [videosLoading, setVideosLoading] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();
    const alias = params.id;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getVideos(1), !clubInfo && getClub()])
            .then(() => {
                setStartElement(1);
                setPageLoaded(true);
            });
    }, [params]);

    const getVideos = async startElem => {
        setVideosLoading(true);
        return Request({
            url: `/api/videogallery/gallery?alias=${alias}&start_element=${startElem}`
        }, data => {
            if (data.length) {
                if (data.length < 15) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setVideos(startElem === 1 ? data : [...videos, ...data]);
            } else {
                if (startElem === 1) {
                    setVideos([]);
                }
                setHasMore(false);
            }
            setVideosLoading(false);
        }, error => handleError(error));
    };

    const getNextVideos = () => {
        if (hasMore) {
            setStartElement(startElement + 15);
            (() => getVideos(startElement + 15))();
        }
    };

    const getClub = () => {
        return Request({
            url: '/api/Club/public/' + alias
        }, data => {
            setClubInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => handleError(error));
    };

    const getFedInfo = (url) => {
        Request({
            url: url
        }, data => {
            setFedInfo(data);
            setPageLoaded(true);
        }, error => {
            console.log(error.response);
            setPageLoaded(true);
        });
    };

    const handleError = e => {
        let errorText;
        if (e.response) {
            errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
        } else {
            errorText = 'запрос не выполнен'
        }
        setShowAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setShowAlert(false)
        });
    };

    const handleDeleteVideo = id => {
        if (window.confirm('Вы действительно хотите удалить видеозапись?')) {
            Request({
                url: `/api/videogallery/gallery`,
                method: 'DELETE',
                data: JSON.stringify([id])
            }, data => {
                setShowAlert({
                    title: `Видео удалено!`,
                    autoclose: 1.5,
                    onOk: () => {
                        setShowAlert(false);
                        setStartElement(1);
                        getVideos(1);
                    }
                });
            }, error => handleError(error));
        }
    };

    const Breadcrumbs = () => {
        return <div className="ClubVideo__breadcrumbs">
            <div className="ClubVideo__breadcrumbs-title">
                Видеозаписи
            </div>
        </div>
    };

    const onSubscriptionUpdate = (subscribed) => {
        setClubInfo({
            ...clubInfo,
            subscribed: subscribed
        })
    }

    useEffect(() => {
        if(clubInfo && clubInfo.federation_alias) {
            let url = `/api/Club/federation_base_info?alias=` + clubInfo.federation_alias;
            getFedInfo(url)
        }
    }, [clubInfo]);

    return (
        <>
            {!pageLoaded && !clubInfo
                ? <Loading />
                : <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className={`club-page__content-wrap${clubInfo.federation_name ? ' _isFederation' : ''}`}>
                                <div className="club-page__content">
                                    {isMobile && clubInfo &&
                                        <>
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                                active_rkf_user={clubInfo.active_rkf_user}
                                                active_member={clubInfo.active_member}
                                                canEdit={canEdit}
                                                subscribed={clubInfo.subscribed}
                                                member={clubInfo.member}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                        </>
                                    }
                                    <div className="ClubVideo__content">
                                        <Card>
                                            <Breadcrumbs />
                                            {!pageLoaded ?
                                                <Loading centered={false} /> :
                                                <>
                                                    <InfiniteScroll
                                                        dataLength={videos.length}
                                                        next={getNextVideos}
                                                        hasMore={hasMore}
                                                        loader={videosLoading && <Loading centered={false} />}
                                                        endMessage={!videos.length &&
                                                            <div className="ClubVideo__no-videos">
                                                                <h4>Не добавлено ни одной видеозаписи</h4>
                                                                <img src={DEFAULT_IMG.emptyGallery} alt="Не добавлено ни одной видеозаписи" />
                                                            </div>
                                                        }
                                                    >
                                                        <VideoGallery
                                                            items={videos}
                                                            match={match}
                                                            backdropClosesModal={true}
                                                            enableImageSelection={false}
                                                            getVideos={getVideos}
                                                            setStartElement={setStartElement}
                                                            setShowAlert={setShowAlert}
                                                            handleDeleteVideo={handleDeleteVideo}
                                                            handleError={handleError}
                                                            canEdit={canEdit}
                                                            alias={alias}
                                                            isClub={true}
                                                        />
                                                    </InfiniteScroll>
                                                </>
                                            }
                                        </Card>
                                    </div>
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
                                                <UserHeader
                                                    user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                    logo={clubInfo.logo_link}
                                                    name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                    alias={clubInfo.club_alias}
                                                    profileId={clubInfo.id}
                                                    federationName={clubInfo.federation_name}
                                                    federationAlias={clubInfo.federation_alias}
                                                    active_rkf_user={clubInfo.active_rkf_user}
                                                    active_member={clubInfo.active_member}
                                                    canEdit={canEdit}
                                                    subscribed={clubInfo.subscribed}
                                                    member={clubInfo.member}
                                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                                    isAuthenticated={isAuthenticated}
                                                />
                                            }
                                            {!isMobile && (clubInfo.user_type === 5 || clubInfo.club_alias === 'rkf') && fedInfo &&
                                                <PhotoComponent
                                                    photo={fedInfo.owner_photo}
                                                    name={fedInfo.owner_name}
                                                    position={fedInfo.owner_position}
                                                />
                                            }
                                            {!isMobile &&
                                                <>
                                                    <MenuComponentNew />
                                                    <UserPhotoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/club/${clubInfo.club_alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <CopyrightInfo withSocials={true} />
                                                </>
                                            }
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                        </Container>
                    </div>
                </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

export default connectAuthVisible(React.memo(ClubVideo));