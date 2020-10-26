import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import { Redirect } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import UserBanner from "../../components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "../../components/Layouts/UserMenu";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import { Request } from "../../utils/request";
import { connectAuthVisible } from "../Login/connectors";
import {endpointGetUserInfo, userNav} from "../User/config";
import { VideoGallery } from "../../components/Gallery";
import useIsMobile from "../../utils/useIsMobile";
import InfiniteScroll from "react-infinite-scroll-component";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import Alert from "../../components/Alert";
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
    const alias = match.params.id;
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => Request({
            url: endpointGetUserInfo + alias
        }, data => {
            data.email = data.emails.length ? data.emails[0].value : '';
            data.phone = data.phones.length ? data.phones[0].value : '';

            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [alias]);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getVideos(1)])
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
                <Link className="btn-backward" to={`/user/${alias}/`}> <span>&lsaquo;</span> Личная страница</Link>&nbsp;/&nbsp;Видеозаписи
            </div>
        </div>
    };

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="/404" /> :
            <Layout>
                <div className="user-page">
                    <Container className="user-page__content content">
                        <aside className="user-page__left">
                            <StickyBox offsetTop={66}>
                                {isMobile &&
                                    <UserBanner link={userInfo.headliner_link} />
                                }
                                <Card>
                                    <UserInfo
                                        logo_link={userInfo.logo_link}
                                        share_link={`https://rkf.online/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        second_name={userInfo.personal_information ? userInfo.personal_information.second_name : ''}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    />
                                    <UserMenu userNav={userNav(alias)} />
                                </Card>
                                {!isMobile &&
                                    <>
                                        <UserPhotoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/gallery`}
                                            canEdit={canEdit}
                                        />
                                        <CopyrightInfo />
                                    </>
                                }
                            </StickyBox>
                        </aside>
                        <div className="user-page__right">
                            {!isMobile &&
                                <UserBanner link={userInfo.headliner_link} />
                            }
                            {isMobile &&
                                <UserPhotoGallery
                                    alias={alias}
                                    pageLink={`/user/${alias}/gallery`}
                                    canEdit={canEdit}
                                />
                            }
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