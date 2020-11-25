import React, { useEffect, useState } from "react";
import Gallery from "react-grid-gallery";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import Card from "../../Card";
import LightTooltip from "../../LightTooltip";
import Alert from "../../Alert";
import { AddPhotoModal } from "../../Gallery";
import { Request } from "../../../utils/request";
import { DEFAULT_IMG } from "../../../appConfig";
import { CSSTransition } from "react-transition-group";
import useIsMobile from "../../../utils/useIsMobile";
import "./index.scss";


const UserPhotoGallery = ({ alias, pageLink, canEdit }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => getImages())();
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

    const getImages = async () => {
        setLoading(true);

        await Request({
            url: `/api/photogallery/gallery?alias=${alias}&element_count=12`
        }, data => {
            if (data.photos.length) {
                const { photos } = data;
                let imagesArr = [];

                for (let i = 0; i < 12; i++) {
                    if (photos[i]) {
                        imagesArr.push({
                            id: photos[i].id,
                            src: photos[i].link,
                            thumbnail: photos[i].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[i].caption
                        });
                    }
                }
                setImages(imagesArr);
                setIsOpen(true);
            }
        }, error => handleError(error)
        );

        setLoading(false);
    };

    const addImagesSuccess = async () => {
        await getImages();
        setShowModal(false);
    };

    const squareStyle = () => {
        return {
            height: '88px',
            width: '88px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    };

    if (!loading && !images.length && isMobile) {
        return null
    } else return (
        <Card className="user-gallery">
            {!images.length ? <div className="user-gallery__header">
                <Link to={pageLink}><h4 className="user-gallery__title">Фотогалерея</h4></Link>
                <div style={{ display: 'flex' }}>
                    {canEdit &&
                        <LightTooltip title="Добавить фото" enterDelay={200} leaveDelay={200}>
                            <button
                                className="user-gallery__add-btn"
                                onClick={() => setShowModal(true)}
                            >+</button>
                        </LightTooltip>}
                    <span className="user-gallery__cutoff"></span>
                    <span
                        className={`user-gallery__chevron ${isOpen ? `_dropdown_open` : ``}`}
                        onClick={() => setIsOpen(!isOpen)}>
                    </span>
                </div>
            </div>
                :
                <div className="user-gallery__header">
                    <Link to={pageLink}><h4 className="user-gallery__title">Фотогалерея</h4></Link>
                    {canEdit && <Link to={pageLink}>Смотреть все</Link>}
                </div>}

            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__gallery"
            >
                <div className="user-gallery__dropdown-wrap">
                    {loading ?
                        <Loading inline={true} /> :
                        images.length
                            ? <div className="ReactGridGallery__wrap" >
                                {!isMobile &&
                                    <div className="ReactGridGallery__placeholder">
                                        {[...Array(12)].map((item, key) =>
                                            <div key={key}>
                                                <img alt="" src="/static/images/noimg/empty-gallery-item.jpg"/>
                                            </div>
                                        )}
                                    </div>
                                }
                                <Gallery
                                    images={images}
                                    enableImageSelection={false}
                                    backdropClosesModal={true}
                                    rowHeight={89}
                                    thumbnailStyle={squareStyle}
                                    imageCountSeparator="&nbsp;из&nbsp;"
                                />
                            </div>
                            : <div className="user-gallery__disabled">
                                <h4 className="user-gallery__disabled-text">Не добавлено ни одной фотографии</h4>
                                <img className="user-gallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет фотографий" />
                            </div>
                    }
                </div>
            </CSSTransition>
            {showModal &&
                <AddPhotoModal
                    showModal={showModal}
                    onModalClose={() => setShowModal(false)}
                    onSuccess={addImagesSuccess}
                />}
            {alert && <Alert {...alert} />}
        </Card>
    )
};

export default React.memo(UserPhotoGallery);