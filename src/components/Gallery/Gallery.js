import React, {memo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Gallery from "react-grid-gallery";
import {AddPhotoModal} from "./components/ImageUpload/AddPhotoModal";
import GalleryAlbums from "./components/GalleryAlbums";
import {DEFAULT_IMG} from "../../appConfig";
import {blockContent} from "../../utils/blockContent";
import "./styles.scss";


const GalleryComponent = ({
    items,
    albums,
    album,
    withLoading = true,
    getAlbums,
    getImages,
    canEdit,
    alias,
    isClub = false,
    isUser = false,
    isNBC = false,
    ...rest
}) => {
    const [showModal, setShowModal] = useState(false);
    const params = useParams();
    const isAlbum = !!params.album;

    const handleAddPhoto = () => {
        setShowModal(true);
    };

    const onModalClose = e => {
        if (showModal && (!e.target.closest('.Alert'))) {
            setShowModal(false);
            blockContent(false);
        }
    };

    const onImageAddSuccess = () => {
        setShowModal(false);
        getImages(1);
        blockContent(false);
    };

    return (
        <div className="ReactGridGallery__wrap">
            {albums && !!albums.length && !isAlbum &&
                <GalleryAlbums
                    albums={albums}
                    getAlbums={getAlbums}
                    canEdit={canEdit}
                />
            }
            {albums && !!albums.length &&
                <div className="ReactGridGallery__controls">
                    <h4>Все фотографии</h4>
                    {canEdit && !album &&
                        <>
                            {!!items.length &&
                                <Link
                                    className="ReactGridGallery__controls-link"
                                    to={isClub ? `/club/${alias}/gallery/edit` :
                                            isUser ? `/user/${alias}/gallery/edit` :
                                            isNBC ? `/nbc/${alias}/gallery/edit` :
                                            `/kennel/${alias}/gallery/edit`
                                    }
                                >
                                    <div className="ReactGridGallery__controls-link__icon">
                                        <svg width="15" height="15" viewBox="0 0 19 19" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725L17.71 4.0425ZM0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z" />
                                        </svg>
                                    </div>
                                    Редактировать все фото
                                </Link>
                            }
                            <span className="ReactGridGallery__controls-link" onClick={() => handleAddPhoto(params.album)}>
                                <div className="ReactGridGallery__controls-link__icon">
                                    <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                                    </svg>
                                </div>
                                Добавить фото
                            </span>
                        </>
                    }
                </div>
            }
            {items && !!items.length ?
                <Gallery
                    imageCountSeparator="&nbsp;из&nbsp;"
                    images={items}
                    {...rest}
                /> :
                <div className="ReactGridGallery__disabled">
                    <h4 className="ReactGridGallery__disabled-text">Не добавлено ни одной фотографии</h4>
                    <img className="ReactGridGallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет фотографий" />
                </div>
            }
            {showModal &&
                <AddPhotoModal
                    showModal={showModal}
                    onModalClose={(e) => onModalClose(e)}
                    albumId={params.album}
                    onSuccess={onImageAddSuccess}
                />
            }
        </div>
    )
};

export default memo(GalleryComponent);