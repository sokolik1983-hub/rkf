import React, { useState } from 'react';
import { AddAlbum } from "components/Gallery";
import { Link } from "react-router-dom";
import { DEFAULT_IMG } from 'appConfig';
import './styles.scss';

const GalleryAlbums = ({ albums, match, getAlbums, canEdit }) => {
    const [showModal, setShowModal] = useState(false);

    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
        }
    };

    const onAlbumAddSuccess = () => {
        setShowModal(false);
        getAlbums();
    };

    return <div className="GalleryAlbums">
        <h4>Альбомы
            {canEdit && <span className="GalleryAlbums__link" onClick={() => setShowModal(true)}>Создать альбом</span>}
        </h4>

        <div className="GalleryAlbums__items-wrap">
            {
                albums.map(a => <div className="GalleryAlbums__item" key={a.id}>
                    <Link to={`${match.url}/${a.id}`}>
                        <div className="GalleryAlbums__item-cover" style={{ 'background': `linear-gradient(to top, rgb(0,0,0,0.65), rgb(0,0,0,0.05) 35%), url(${a.cover || DEFAULT_IMG.noImage}) center/cover no-repeat` }}>
                            <div className="GalleryAlbums__item-name">{a.name}</div>
                            <div className="GalleryAlbums__item-count">{a.count > 99 ? '99+' : a.count}</div>
                        </div>
                    </Link>
                </div>)
            }
        </div>
        {showModal && <AddAlbum showModal={showModal} onModalClose={onModalClose} onSuccess={onAlbumAddSuccess} />}
    </div>
};

export default GalleryAlbums;