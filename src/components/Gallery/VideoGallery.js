import React, { useState } from 'react';
import { AddVideoModal } from "components/Gallery";
import { VideoModal } from "components/Modal";
import { useParams } from "react-router-dom";
import getYoutubeTitle from 'get-youtube-title';
import { PromiseRequest } from 'utils/request';
import { DEFAULT_IMG } from "../../appConfig";
import { getYoutubeVideoId } from "utils/video";
import './styles.scss';

const VideoGallery = ({ items, match, getVideos, setStartElement, setShowAlert, handleDeleteVideo, handleError, canEdit, alias, isClub = false }) => {
    const [showModal, setShowModal] = useState(false);
    let params = useParams();

    const handleAddVideo = () => {
        setShowModal({ type: 'addVideo' });
    }

    const onVideoAddSuccess = (link) => {
        const id = getYoutubeVideoId(link);
        getYoutubeTitle(id, function (err, title) {
            if (err) {
                handleError(err);
                return;
            }
            PromiseRequest({
                url: `/api/videogallery/youtube_link`,
                method: 'POST',
                data: JSON.stringify({
                    name: title,
                    video_id: id
                })
            }).then(() => {
                setStartElement(1);
                getVideos(1);
                setShowAlert({
                    title: `Видеозапись добавлена`,
                    autoclose: 1.5,
                    onOk: () => setShowAlert(false)
                })
            }).catch(error => handleError(error))
        })
    };

    const VideoGalleryItem = ({ item }) => {
        const { cover_link, name, id } = item;
        return <div className="VideoGallery__item">
            {canEdit && <div className="VideoGallery__item-delete" onClick={() => handleDeleteVideo(id)} />}
            <img src={cover_link} onClick={() => setShowModal({ type: 'openVideo', item: item })} alt="" />
            <h5 className="VideoGallery__item-name">{name}</h5>
        </div>
    }

    return <div className="ReactGridGallery__wrap">
        <div className="ReactGridGallery__controls">
            <h4>Все видеозаписи</h4>
            {canEdit && <>
                {/* {!!items.length && <Link className="ReactGridGallery__controls-link" to={isClub ? `/${alias}/gallery/edit` : `/kennel/${alias}/gallery/edit`}>Редактировать все видеозаписи</Link>} */}
                <span className="ReactGridGallery__controls-link" onClick={() => handleAddVideo(params.album)}>Добавить видео</span></>
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
            <AddVideoModal showModal={showModal} setShowModal={setShowModal} onSuccess={onVideoAddSuccess} />}
        {showModal && showModal.type === 'openVideo' &&
            <VideoModal showModal={showModal} handleClose={() => setShowModal(false)} className="VideoGallery__modal">
                <div dangerouslySetInnerHTML={{ __html: showModal.item.iframe }} />
            </VideoModal>}
    </div>
};

export default VideoGallery;