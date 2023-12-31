import React, {memo, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import {metadata} from "youtube-metadata-from-url";
import {CSSTransition} from "react-transition-group";
import Loading from "../../Loading";
import Card from "../../Card";
import Alert from "../../Alert";
import LightTooltip from "../../LightTooltip";
import {VideoModal} from "../../Modal";
import {AddVideoModal} from "../../Gallery";
import {DEFAULT_IMG} from "../../../appConfig";
import {Request} from "../../../utils/request";
import useIsMobile from "../../../utils/useIsMobile";
import useStickyState from "../../../utils/useStickyState";
import "./index.scss";


const UserVideoGallery = ({alias, pageLink, canEdit}) => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [videoFrame, setVideoFrame] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [alertData, setAlertData] = useState(null);
    const [isOpen, setIsOpen] = useStickyState(true, 'is_video_gallery_open');
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        (() => getVideo())();
    }, []);

    const getVideo = async () => {
        setLoading(true);

        await Request({
            url: `/api/videogallery/gallery?alias=${alias}&element_count=2`
        }, data => {
            if(data) {
                setVideos(data);
            }
        }, error => handleError(error));

        setLoading(false);
    };

    const addVideo = link => {
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
                    getVideo()
                        .then(() => setAlertData({
                            title: 'Видеозапись добавлена',
                            autoclose: 1.5,
                            onOk: () => setAlertData(null)}
                        ));
                }, error => handleError(error));
            }, err => {
                handleError(err);
            });
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

    if (!loading && !videos.length && isMobile) {
        return null;  //а этот компонент на мобиле вообще отображается?
    }

    return (
        <Card className="user-gallery _video">
            <div className="user-gallery__header">
                <Link to={pageLink}><h4 className="user-gallery__title">Видеозаписи</h4></Link>
                <div>
                    {canEdit && !videos.length ?
                        <LightTooltip title="Добавить видео" enterDelay={200} leaveDelay={200}>
                            <button
                                className="user-gallery__add-btn"
                                onClick={() => {
                                    setModalType('addVideo');
                                    setShowModal(true);
                                }}
                            >+</button>
                        </LightTooltip> :
                        <Link to={pageLink}>Смотреть все</Link>
                    }
                    <span className="user-gallery__cutoff"></span>
                    <span
                        className={`user-gallery__chevron${isOpen ? ' _dropdown_open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}>
                    </span>
                </div>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__gallery"
            >
                <div className="user-gallery__dropdown-wrap">
                    {loading ?
                        <Loading inline={true} /> :
                        videos.length ?
                            videos.map(video =>
                                <div key={video.id} className="user-gallery__item">
                                    <img
                                        src={video.cover_link}
                                        onClick={() => {
                                            setVideoFrame(video.iframe);
                                            setModalType('viewVideo');
                                            setShowModal(true);
                                        }}
                                        alt=""
                                    />
                                    <h5 className="user-gallery__item-name">{video.name}</h5>
                                </div>
                            ) :
                            <div className="user-gallery__disabled">
                                <img
                                    className="user-gallery__disabled-img"
                                    src={DEFAULT_IMG.emptyVideoGallery}
                                    alt="У вас нет видеозаписей"
                                />
                            </div>
                    }
                </div>
            </CSSTransition>
            {showModal && modalType === 'viewVideo' &&
                <VideoModal
                    showModal={showModal}
                    handleClose={() => {
                        setVideoFrame(null);
                        setModalType('');
                        setShowModal(false);
                    }}
                    className="user-gallery__modal"
                >
                    <div dangerouslySetInnerHTML={{__html: videoFrame}} />
                </VideoModal>
            }
            {showModal && modalType === 'addVideo' &&
                <AddVideoModal
                    showModal={showModal}
                    onClose={() => {
                        setModalType('');
                        setShowModal(false);
                    }}
                    onSuccess={addVideo}
                />}
            {alertData && <Alert {...alertData} />}
        </Card>
    )
};

export default memo(UserVideoGallery);