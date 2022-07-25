import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import { Redirect, useParams } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import UserInfo from "../../components/Layouts/UserInfo";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import { Request } from "../../utils/request";
import { connectAuthVisible } from "../Login/connectors";
import { endpointGetUserInfo } from "components/Layouts/UserLayout/config";
import { VideoGallery } from "../../components/Gallery";
import useIsMobile from "../../utils/useIsMobile";
import InfiniteScroll from "react-infinite-scroll-component";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import Alert from "../../components/Alert";
import ls from "local-storage";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./index.scss";

const UserVideo = ({ match, profile_id, is_active_profile, isAuthenticated }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [videosLoading, setVideosLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [videos, setVideos] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const params = useParams();
    const alias = match.params.alias;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        (() => getUserInfo())();
    }, [alias]);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getVideos(1)])
            .then(() => {
                setStartElement(1);
                setPageLoaded(true);
            });
    }, [params]);

    const getUserInfo = async needUpdateAvatar => {
        setLoading(true);

        await Request({
            url: endpointGetUserInfo + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
        })

        setLoading(false);
    };

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

    const Breadcrumbs = () => {
        return <div className="UserVideo__breadcrumbs">
            <div className="UserVideo__breadcrumbs-title">
                Видеозаписи
            </div>
        </div>
    };

    const onSubscriptionUpdate = (subscribed) => {
        setUserInfo({
            ...userInfo,
            subscribed: subscribed
        })
    }

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="/404" /> :
            <Layout>
                <div className="user-page">
                    <Container className="user-page__content content">
                        <aside className="user-page__left">
                            <StickyBox offsetTop={60}>
                                <Card>
                                    <UserInfo
                                        canEdit={canEdit}
                                        logo_link={userInfo.logo_link}
                                        share_link={`${window.location.host}/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                        alias={alias}
                                        subscribed={userInfo.subscribed}
                                        subscribed_id={userInfo.profile_id}
                                        onSubscriptionUpdate={onSubscriptionUpdate}
                                        updateInfo={getUserInfo}
                                        judgeInfo={userInfo.open_roles}
                                    />
                                </Card>
                                {!isMobile &&
                                    <>
                                        <MenuComponentNew />
                                        <UserPhotoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/gallery`}
                                            canEdit={canEdit}
                                        />
                                        <CopyrightInfo withSocials={true} />
                                    </>
                                }
                            </StickyBox>
                        </aside>
                        <div className="user-page__right">
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
                    </Container>
                </div>
                {showAlert && <Alert {...showAlert} />}
            </Layout>
};

export default React.memo(connectAuthVisible(UserVideo));