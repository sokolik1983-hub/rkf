import React, { useState } from 'react';
import Gallery from 'react-grid-gallery';
import { AddPhotoModal } from "components/Gallery";
import GalleryAlbums from './components/GalleryAlbums';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './styles.scss';
import { DEFAULT_IMG } from "../../appConfig";

const GalleryComponent = ({ items, albums, album, match, withLoading = true, getAlbums, getImages, canEdit, alias, isClub = false, ...rest }) => {
    const [showModal, setShowModal] = useState(false);
    let params = useParams();
    const isAlbum = !!params.album;

    const handleAddPhoto = () => {
        setShowModal(true);
    }

    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
        }
    };

    const onImageAddSuccess = () => {
        setShowModal(false);
        getImages(1);
    };

    return <div className="ReactGridGallery__wrap">
        {albums && !!albums.length && !isAlbum
            && <GalleryAlbums albums={albums} match={match} getAlbums={getAlbums} canEdit={canEdit} />}
        {albums && !!albums.length && <div className="ReactGridGallery__controls">
            <h4>Все фотографии</h4>
            {canEdit && !album && <>
                {items.length && <Link className="ReactGridGallery__controls-link" to={isClub ? `/${alias}/gallery/edit` : `/kennel/${alias}/gallery/edit`}>Редактировать все фото</Link>}
                <span className="ReactGridGallery__controls-link" onClick={() => handleAddPhoto(params.album)}>Добавить фото</span></>
            }
        </div>}
        {items && !!items.length
            ? <Gallery
                imageCountSeparator="&nbsp;из&nbsp;"
                images={items}
                {...rest}
            />
            : <div className="ReactGridGallery__disabled">
                <h4 className="ReactGridGallery__disabled-text">Не добавлено ни одной фотографии</h4>
                <img className="ReactGridGallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет фотографий" />
            </div>
        }
        {showModal && <AddPhotoModal showModal={showModal} onModalClose={onModalClose} albumId={params.album} onSuccess={onImageAddSuccess} />}
    </div>
};

export default GalleryComponent;