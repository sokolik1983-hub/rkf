import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import getYoutubeTitle from "get-youtube-title";
import Loading from "../../Loading";
import Card from "../../Card";
import Alert from "../../Alert";
import LightTooltip from "../../LightTooltip";
import { VideoModal } from "../../Modal";
import { AddVideoModal } from "../../Gallery";
import { Request } from "../../../utils/request";
import { DEFAULT_IMG } from "../../../appConfig";
import { CSSTransition } from "react-transition-group";
import useIsMobile from "../../../utils/useIsMobile";
import "./index.scss";


const UserVideoGallery = ({ alias, pageLink, canEdit }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [alert, setAlert] = useState(null);
    const [videoFrame, setVideoFrame] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => getVideo())();
    }, []);

    const handleError = e => {
        let errorText;
        if (e.response) {
            errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
        } else {
            errorText = 'запрос не выполнен'
        }
        setAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setAlert(null)
        });
    };

    const getVideo = async () => {
        setLoading(true);
        await Request({
            url: `/api/videogallery/gallery?alias=${alias}&element_count=2`,
        }, data => {
            setVideos(data);
            if (data.length) {
                setIsOpen(true);
            }
        }, error => handleError(error));
        setLoading(false);
    };

    const addVideo = link => {
        const id = getYouTubeID(link);

        getYoutubeTitle(id, async (err, title) => {
            if (err) {
                handleError(err);
                return;
            }

            await Request({
                url: `/api/videogallery/youtube_link`,
                method: 'POST',
                data: JSON.stringify({
                    name: title,
                    video_id: id
                })
            }, data => {
                getVideo().then(() => setAlert({
                    title: `Видеозапись добавлена`,
                    autoclose: 1.5,
                    onOk: () => setAlert(null)
                }));
            }, error => handleError(error));
        });
    };

    if (!loading && !videos.length && isMobile) {
        return null
    } else return (
        <Card className="user-gallery">
            <div className="user-gallery__header" onClick={() => setIsOpen(!isOpen)}>
                <Link to={pageLink}><h4 className="user-gallery__title">Видеозаписи</h4></Link>
                {!isOpen && <div style={{ display: 'flex' }}>
                    {!videos.length && canEdit ?
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
                    <span className={`user-gallery__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
                </div>}
                {isOpen && <Link to={pageLink}>Смотреть все</Link>}
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
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
                                <h4 className="user-gallery__disabled-text">Не добавлено ни одной видеозаписи</h4>
                                <img className="user-gallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет видеозаписей" />
                            </div>
                    }
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
                            <div dangerouslySetInnerHTML={{ __html: videoFrame }} />
                        </VideoModal>
                    }
                    {showModal && modalType === 'addVideo' &&
                        <AddVideoModal
                            showModal={showModal}
                            setShowModal={() => {
                                setModalType('');
                                setShowModal(false);
                            }}
                            onSuccess={addVideo}
                        />
                    }
                    {alert && <Alert {...alert} />}
                </div>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(UserVideoGallery);