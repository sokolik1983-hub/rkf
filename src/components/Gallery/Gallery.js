import React from 'react';
import Gallery from 'react-grid-gallery';
import GalleryAlbums from './components/GalleryAlbums';
import { useParams } from "react-router-dom";
import './styles.scss';
import { DEFAULT_IMG } from "../../appConfig";

const GalleryComponent = ({ items, albums, match, withLoading = true, ...rest }) => {
    let params = useParams();
    const isAlbum = !!params.album;

    return <div className="ReactGridGallery__wrap">
        {albums && !!albums.length && !isAlbum
            && <GalleryAlbums albums={albums} match={match} />}
        {items && !!items.length
            ? <>
                {albums && !!albums.length && <h4>Фотографии</h4>}
                <Gallery
                    imageCountSeparator="&nbsp;из&nbsp;"
                    images={items}
                    {...rest}
                />
            </>
            : <div className="ReactGridGallery__disabled">
                <h4 className="ReactGridGallery__disabled-text">Не добавлено ни одной фотографии</h4>
                <img className="ReactGridGallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет фотографий" />
            </div>
        }
    </div>
};

export default GalleryComponent;