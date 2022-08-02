import React, {memo, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import Alert from "../../../../components/Alert";
import {VideoGallery} from "../../../../components/Gallery";
import {Request} from "../../../../utils/request";
import "./index.scss";


const VideoGalleryPage = ({canEdit}) => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [alertData, setAlertData] = useState(null);
    const {alias} = useParams();

    useEffect(() => {
        (() => getVideos(1))();
    }, []);

    const getVideos = async startElem => {
        setLoading(true);

        await Request({
            url: `/api/videogallery/gallery?alias=${alias}&start_element=${startElem}`
        }, data => {
            if (data.length) {
                if (data.length < 15) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setVideos(prev => startElem === 1 ? data : [...prev, ...data]);
            } else {
                if (startElem === 1) {
                    setVideos([]);
                }
                setHasMore(false);
            }
        }, error => handleError(error));

        setLoading(false);
    };

    const getNextVideos = async () => {
        if (hasMore) {
            setStartElement(startElement + 15);
            await getVideos(startElement + 15);
        }
    };

    const handleDeleteVideo = async id => {
        if (window.confirm(`Вы действительно хотите удалить видеозапись ${id}?`)) {
            await Request({
                url: '/api/videogallery/gallery',
                method: 'DELETE',
                data: JSON.stringify([id])
            }, () => {
                setAlertData({
                    title: 'Видео удалено!',
                    autoclose: 1.5,
                    onOk: () => {
                        setAlertData(null);
                        setStartElement(1);
                        getVideos(1);
                    }
                });
            }, error => handleError(error));
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

        setAlertData({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setAlertData(null)
        });
    };

    return (
        <Card className="video-page">
            <h3 className="video-page__title">Видеозаписи</h3>
            <InfiniteScroll
                dataLength={videos.length}
                next={getNextVideos}
                hasMore={hasMore}
                loader={loading && <Loading centered={false} />}
            >
                <VideoGallery
                    items={videos}
                    getVideos={getVideos}
                    setStartElement={setStartElement}
                    setShowAlert={setAlertData}
                    handleDeleteVideo={handleDeleteVideo}
                    handleError={handleError}
                    canEdit={canEdit}
                />
            </InfiniteScroll>
            {alertData && <Alert {...alertData} />}
        </Card>
    )
};

export default memo(VideoGalleryPage);