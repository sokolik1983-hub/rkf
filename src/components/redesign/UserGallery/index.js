import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Request } from "utils/request";
import { Gallery } from "components/Gallery";
import "./index.scss";

const UserGallery = ({ alias, isKennel }) => {
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        setLoading(true);
        Request({
            url: `/api/photogallery/gallery?alias=${alias}&elem_count=12`,
            method: 'GET'
        }, data => {
            if (data.photos.length) {
                const twelveItemsArray = Array.apply(null, Array(12)).map((x, i) => i);
                const { photos } = data;

                const imagesArray = twelveItemsArray.map(p => {
                    if (photos[p]) {
                        return {
                            id: photos[p].id,
                            src: photos[p].link,
                            thumbnail: photos[p].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[p].caption
                        }
                    } else {
                        return {
                            id: p,
                            src: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnail: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnailWidth: 88,
                            thumbnailHeight: 88
                        }
                    }
                });

                setImages(imagesArray);
            }
            setLoading(false);
        },
            error => {
                //handleError(error);
                setLoading(false);
            });
    };

    const squareStyle = () => {
        return {
            height: '88px',
            width: '88px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    };

    return (
        <Card className="user-gallery__wrap">
            <div className="user-gallery__header">
                <h4 className="user-gallery__title">Фотогалерея</h4>
                <Link to={`/${isKennel ? 'kennel/' + alias : alias}/gallery`}>Смотреть все</Link>
            </div>
            {
                loading
                    ? <Loading inline={true} />
                    : <Gallery
                        items={images}
                        backdropClosesModal={true}
                        enableImageSelection={false}
                        withLoading={false}
                        rowHeight={89}
                        thumbnailStyle={squareStyle}
                    />
            }
        </Card>
    );

};

export default UserGallery;