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
import MenuComponent from "../../components/MenuComponent";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import { VideoGallery } from "components/Gallery";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import "./styles.scss";
import "pages/Nursery/index.scss";


const NurseryVideo = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [nursery, setNursery] = useState(null);
    const [videos, setVideos] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [videosLoading, setVideosLoading] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const params = useParams();
    const alias = match.params.id;
    const isMobile = useIsMobile();

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getVideos(1), !nursery && getNursery()])
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

    const getNursery = () => {
        return Request({
            url: '/api/nurseries/nursery/public/' + params.id
        }, data => {
            setNursery(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => handleError(error));
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
        return <div className="NurseryVideo__breadcrumbs">
            <div className="NurseryVideo__breadcrumbs-title">
                Видеозаписи
            </div>
        </div>
    };

    return (
        <>
            {!pageLoaded && !nursery
                ? <Loading />
                : <Layout>
                    <div className="redesign">
                        <Container className="content nursery-page">
                            <div className="nursery-page__content-wrap">
                                <div className="nursery-page__content">
                                    {isMobile &&
                                        <>
                                            <UserHeader
                                                user="nursery"
                                                logo={nursery.logo_link}
                                                name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                alias={alias}
                                                profileId={nursery.id}
                                                federationName={nursery.federation_name}
                                                federationAlias={nursery.federation_alias}
                                                active_rkf_user={nursery.active_rkf_user}
                                                active_member={nursery.active_member}
                                            />
                                            {nursery.breeds && !!nursery.breeds.length &&
                                                <Card className="nursery-page__breeds">
                                                    <h4>Породы</h4>
                                                    <ul className="nursery-page__breeds-list">
                                                        {nursery.breeds.map(item =>
                                                            <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                        )}
                                                    </ul>
                                                </Card>
                                            }
                                        </>
                                    }
                                    <div className="NurseryVideo__content">
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
                                <Aside className="nursery-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="nursery-page__info-inner">
                                            {!isMobile &&
                                                <>
                                                    <UserHeader
                                                        user="nursery"
                                                        logo={nursery.logo_link}
                                                        name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                        alias={alias}
                                                        profileId={nursery.id}
                                                        federationName={nursery.federation_name}
                                                        federationAlias={nursery.federation_alias}
                                                        active_rkf_user={nursery.active_rkf_user}
                                                        active_member={nursery.active_member}
                                                    />
                                                    {nursery.breeds && !!nursery.breeds.length &&
                                                        <Card className="nursery-page__breeds">
                                                            <h4>Породы</h4>
                                                            <ul className="nursery-page__breeds-list">
                                                                {nursery.breeds.map(item =>
                                                                    <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                                )}
                                                            </ul>
                                                        </Card>
                                                    }
                                                    <UserPhotoGallery
                                                        alias={alias}
                                                        pageLink={`/kennel/${alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <CopyrightInfo />
                                                </>
                                            }
                                            {isMobile &&
                                                <MenuComponent
                                                    alias={alias}
                                                    user={user}
                                                    profileId={nursery.id}
                                                    noCard={true}
                                                />
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

export default connectAuthVisible(React.memo(NurseryVideo));