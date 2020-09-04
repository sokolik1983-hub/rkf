import React from 'react';
import { Link } from "react-router-dom";
import { DEFAULT_IMG } from 'appConfig';
import './styles.scss';

const GalleryAlbums = ({ albums, match }) => {

    return <div className="GalleryAlbums">
        <h4>Альбомы</h4>
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
    </div>
};

export default GalleryAlbums;