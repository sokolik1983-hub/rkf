import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../Loading";
import Card from "../../Card";
import {VideoModal} from "../../Modal";
import {Request} from "../../../utils/request";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const UserVideoGallery = ({alias, pageLink}) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [videoFrame, setVideoFrame] = useState(null);

    useEffect(() => {
        (() => Request({
            url: `/api/videogallery/gallery?alias=${alias}&element_count=2`,
        }, data => {
            // const defaultVideo = {
            //     "id": 36,
            //     "name": "Sony 4K Demo: Another World",
            //     "url": "https://www.youtube.com/watch?v=xcJtL7QggTI",
            //     "youtube_video_id": "xcJtL7QggTI",
            //     "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xcJtL7QggTI\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
            //     "cover_link": "https://img.youtube.com/vi/xcJtL7QggTI/0.jpg"
            // };
            // setVideos([defaultVideo, defaultVideo]);

            setVideos(data);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return (
        <Card className="user-gallery">
            <div className="user-gallery__header">
                <h4 className="user-gallery__title">Видеозаписи</h4>
                <Link to={pageLink}>Смотреть все</Link>
            </div>
            {loading ?
                <Loading inline={true} /> :
                videos.length ?
                    videos.map(video =>
                        <div key={video.id} className="user-gallery__item">
                            <img
                                src={video.cover_link}
                                onClick={() => {
                                    setVideoFrame(video.iframe);
                                    setShowModal(true);
                                }}
                                alt=""
                            />
                            <h5 className="user-gallery__item-name">{video.name}</h5>
                        </div>
                    ) :
                    <div className="user-gallery__disabled">
                        <h4 className="user-gallery__disabled-text">Не добавлено ни одной видеозаписи</h4>
                        <img className="user-gallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет видеозаписей" />
                    </div>
            }
            {showModal &&
                <VideoModal
                    showModal={showModal}
                    handleClose={() => {
                        setVideoFrame(null);
                        setShowModal(false);
                    }}
                    className="user-gallery__modal"
                >
                    <div dangerouslySetInnerHTML={{__html: videoFrame}} />
                </VideoModal>
            }
        </Card>
    )
};

export default React.memo(UserVideoGallery);