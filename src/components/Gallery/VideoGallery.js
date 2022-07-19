import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import { metadata } from "youtube-metadata-from-url";
import { VideoModal } from "../Modal";
import { DEFAULT_IMG } from "../../appConfig";
import { Request } from "../../utils/request";
import { blockContent } from "../../utils/blockContent";
import { AddVideoModal } from "../../components/Gallery";

import "./styles.scss";


const VideoGallery = ({ items, match, getVideos, setStartElement, setShowAlert, handleDeleteVideo, handleError, canEdit, alias, isClub = false }) => {
    const [showModal, setShowModal] = useState(false);
    let params = useParams();

    const handleAddVideo = () => {
        setShowModal({ type: 'addVideo' });
    }

    const onVideoAddSuccess = link => {
        const id = getYouTubeID(link);
        metadata(`https://youtu.be/${id}`)
            .then(function(json){
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
                        onOk: () => setShowAlert(false)
                    })
                }, error => handleError(error));
            }, function(err) {
                handleError(err);
        });
    };

    const VideoGalleryItem = ({ item }) => {
        const { cover_link, name, id } = item;
        return <div className="VideoGallery__item">
            {canEdit && <div className="VideoGallery__item-delete" onClick={() => handleDeleteVideo(id)} />}
            <img src={cover_link} onClick={() => setShowModal({ type: 'openVideo', item: item })} alt="" />
            <h5 className="VideoGallery__item-name">{name}</h5>
        </div>
    };

    useEffect(() => {
        !showModal && blockContent(showModal);
    }, [showModal]);

    return <div className="ReactGridGallery__wrap">
        <div className="ReactGridGallery__controls">
            <h4>Все видеозаписи</h4>
            {canEdit && <>
                <span className="ReactGridGallery__controls-link" onClick={() => handleAddVideo(params.album)}>
                    <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                    </svg>
                    &nbsp;Добавить видео
                </span>
            </>
            }
        </div>
        <div className="VideoGallery__items-wrap">
            {items && !!items.length
                ? items.map(item => <VideoGalleryItem key={item.id} item={item} />)
                : <div className="ReactGridGallery__disabled">
                    <h4 className="ReactGridGallery__disabled-text">Не добавлено ни одной видеозаписи</h4>
                    <img className="ReactGridGallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет видеозаписей" />
                </div>
            }
        </div>
        {showModal && showModal.type === 'addVideo' &&
            <AddVideoModal showModal={showModal} setShowModal={setShowModal} onSuccess={onVideoAddSuccess} />
        }
        {showModal && showModal.type === 'openVideo' &&
            <VideoModal showModal={showModal} handleClose={() => setShowModal(false)} className="VideoGallery__modal">
                <div dangerouslySetInnerHTML={{ __html: showModal.item.iframe }} />
            </VideoModal>
        }
    </div>
};

export default VideoGallery;