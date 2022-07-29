import React, {memo, useState} from "react";
import {Link} from "react-router-dom";
import {AddAlbum} from "./AlbumForm";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./styles.scss";


const GalleryAlbums = ({albums, getAlbums, canEdit}) => {
    const [showModal, setShowModal] = useState(false);

    const onModalClose = () => {
        showModal && setShowModal(false);
    };

    const onAlbumAddSuccess = () => {
        setShowModal(false);
        getAlbums();
    };

    return (
        <div className="GalleryAlbums">
            <h4>
                Альбомы
                {canEdit &&
                    <span className="GalleryAlbums__link" onClick={() => setShowModal(true)}>
                        <svg width="19" height="15" viewBox="0 0 20 16" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L10 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H2C0.89 16 0 15.1 0 14V2C0 0.89 0.89 0 2 0H8ZM13 5V8H10V10H13V13H15V10H18V8H15V5H13Z" />
                        </svg>
                        &nbsp;Создать альбом
                    </span>
                }
            </h4>
            <div className="GalleryAlbums__items-wrap">
                {albums.map(a =>
                    <div className="GalleryAlbums__item" key={a.id}>
                        <Link to={`gallery/${a.id}`}>
                            <div
                                className="GalleryAlbums__item-cover"
                                style={{'background': `linear-gradient(to top, rgb(0,0,0,0.65), rgb(0,0,0,0.05) 35%), url(${a.cover || DEFAULT_IMG.noImage}) center/cover no-repeat` }}
                            >
                                <div className="GalleryAlbums__item-name">{a.name}</div>
                                <div className="GalleryAlbums__item-count">{a.count > 99 ? '99+' : a.count}</div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <AddAlbum showModal={showModal} onModalClose={onModalClose} onSuccess={onAlbumAddSuccess} />
        </div>
    );
};

export default memo(GalleryAlbums);