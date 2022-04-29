import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserHeader from "../../components/redesign/UserHeader";
import NBCLayout from "../../components/Layouts/NBCLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import {VideoGallery} from "../../components/Gallery";
import Loading from "../../components/Loading";
import {DEFAULT_IMG} from "../../appConfig";
import {Request} from "../../utils/request";
import Alert from "components/Alert";
import Card from "components/Card";

import "./styles.scss"

const Content = ({
                     isMobile,
                     nbcInfo,
                     canEdit,
                     getNBCInfo,
                     nbcProfileId,
                     isAuthenticated,
                     onSubscriptionUpdate,
                    match
                 }) => {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [videosLoading, setVideosLoading] = useState(false);
    const {alias} = useParams();
    let params = useParams();

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getVideos(1), !nbcInfo && getNBCInfo()])
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
            console.log('data5555', data);
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
        if (window.confirm(`Вы действительно хотите удалить видеозапись?${id}`)) {
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
        return <div className="nbc-page__breadcrumbs">
            <div className="nbc-page__breadcrumbs-title">
                Видеозаписи
            </div>
        </div>
    };

    return (
        <>
            {isMobile && nbcInfo &&
                <>
                    <UserHeader
                        user='nbc'
                        logo={nbcInfo.logo_link}
                        name={nbcInfo.short_name || nbcInfo.name || 'Название питомника1 отсутствует'}
                        alias={nbcInfo.alias}
                        profileId={nbcProfileId}
                        canEdit={canEdit}
                        subscribed={nbcInfo.subscribed}
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
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

const NBCVideo = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default NBCVideo;