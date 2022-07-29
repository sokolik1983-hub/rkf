import React, {memo, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import {metadata} from "youtube-metadata-from-url";
import {VideoModal} from "../Modal";
import {AddVideoModal} from "../../components/Gallery";
import {DEFAULT_IMG} from "../../appConfig";
import {Request} from "../../utils/request";
import {blockContent} from "../../utils/blockContent";
import "./styles.scss";


const VideoGallery = ({items, getVideos, setStartElement, setShowAlert, handleDeleteVideo, handleError, canEdit}) => {
    const [modalData, setModalData] = useState(null);
    const params = useParams();

    useEffect(() => {
        blockContent(!!modalData);
    }, [modalData]);

    const handleAddVideo = () => {
        setModalData({type: 'addVideo'});
    };

    const onVideoAddSuccess = link => {
        const id = getYouTubeID(link);

        metadata(`https://youtu.be/${id}`)
            .then(json => {
                Request({
                    url: '/api/videogallery/youtube_link',
                    method: 'POST',
                    data: JSON.stringify({
                        name: json.title,
                        video_id: id
                    })
                }, () => {
                    setStartElement(1);
                    getVideos(1);
                    setShowAlert({
                        title: 'Видеозапись добавлена',
                        autoclose: 1.5,
                        onOk: () => setShowAlert(null)
                    });
                }, error => handleError(error));
            }, err => {
                handleError(err);
            });
    };

    return (
        <div className="ReactGridGallery__wrap">
            <div className="ReactGridGallery__controls">
                <h4>Все видеозаписи</h4>
                {canEdit &&
                    <span className="ReactGridGallery__controls-link" onClick={() => handleAddVideo(params.album)}>
                        <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                        </svg>
                        &nbsp;Добавить видео
                    </span>
                }
            </div>
            <div className="VideoGallery__items-wrap">
                {items && items.length ?
                    items.map(item =>
                        <div className="VideoGallery__item" key={item.id}>
                            {canEdit &&
                                <div className="VideoGallery__item-delete" onClick={() => handleDeleteVideo(item.id)} />
                            }
                            <img
                                src={item.cover_link}
                                onClick={() => setModalData({type: 'openVideo', item: item})}
                                alt=""
                            />
                            <h5 className="VideoGallery__item-name">{item.name}</h5>
                        </div>
                    )
                    :
                    <div className="ReactGridGallery__disabled">
                        <h4 className="ReactGridGallery__disabled-text">Не добавлено ни одной видеозаписи</h4>
                        <img className="ReactGridGallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет видеозаписей" />
                    </div>
                }
            </div>
            {modalData && modalData.type === 'addVideo' &&
                <AddVideoModal
                    showModal={true}
                    onClose={() => setModalData(null)}
                    onSuccess={onVideoAddSuccess}
                />
            }
            {modalData && modalData.type === 'openVideo' &&
                <VideoModal
                    showModal={true}
                    handleClose={() => setModalData(null)}
                    className="VideoGallery__modal"
                >
                    <div dangerouslySetInnerHTML={{__html: modalData.item.iframe}} />
                </VideoModal>
            }
        </div>
    );
};

export default memo(VideoGallery);