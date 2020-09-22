import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { Link, useParams } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { VideoGallery, AddPhotoModal } from "components/Gallery";
import Alert from "components/Alert";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import StickyBox from "react-sticky-box";
import Aside from "components/Layouts/Aside";
import ClubUserHeader from "../../components/redesign/UserHeader";
import MenuComponent from "../../components/MenuComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { DEFAULT_IMG } from "appConfig";
import "./styles.scss";
import "pages/Club/index.scss";

const ClubVideo = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [videosLoading, setVideosLoading] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    let params = useParams();
    const alias = params.id;

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
            url: `/api/videogallery/gallery?alias=${alias}&start_element=${startElem}`,
            method: 'GET'
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
    }

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
    }

    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
        }
    };

    const onImageAddSuccess = () => {
        setShowModal(false);
        getVideos(1);
    };


    const Breadcrumbs = () => {
        return <div className="ClubVideo__breadcrumbs">
            <div className="ClubVideo__breadcrumbs-title">
                <Link className="btn-backward" to={`/${alias}/`}> <span>&lsaquo;</span> Личная страница</Link>&nbsp;/&nbsp;Видеозаписи
            </div>
        </div>
    };

    return (
        <>
            {!pageLoaded && !clubInfo
                ? <Loading />
                : <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <Card className="club-page__content-banner">
                                        <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                    </Card>
                                    <div className="club-page__mobile-only">
                                        <ClubUserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                        />
                                    </div>
                                    <div className="ClubVideo__content">
                                        <Card>
                                            <Breadcrumbs />
                                            {
                                                !pageLoaded
                                                    ? <Loading centered={false} />
                                                    : <>
                                                        <InfiniteScroll
                                                            dataLength={videos.length}
                                                            next={getNextVideos}
                                                            hasMore={hasMore}
                                                            loader={videosLoading && <Loading centered={false} />}
                                                            endMessage={!!videos.length &&
                                                                <div className="ClubVideo__no-videos">
                                                                    <h4>Видеозаписей больше нет</h4>
                                                                    <img src={DEFAULT_IMG.emptyGallery} alt="Видеозаписей больше нет" />
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
                                    <StickyBox offsetTop={65}>
                                        <div className="club-page__info-inner">
                                            <ClubUserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                            />
                                            <div className="club-page__copy-wrap">
                                                <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                                <p>Политика обработки персональных данных</p>
                                            </div>
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                            <div className="club-page__mobile-only">
                                <MenuComponent
                                    alias={clubInfo.club_alias}
                                    user={user}
                                    profileId={clubInfo.id}
                                    noCard={true}
                                />
                            </div>
                        </Container>
                    </div>
                </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
            {showModal && <AddPhotoModal showModal={showModal} onModalClose={onModalClose} albumId={params.album} onSuccess={onImageAddSuccess} />}
        </>
    )
};

export default connectAuthVisible(React.memo(ClubVideo));