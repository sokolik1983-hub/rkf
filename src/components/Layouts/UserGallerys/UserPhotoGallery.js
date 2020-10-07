import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../Loading";
import Card from "../../Card";
import {Gallery} from "../../Gallery";
import {Request} from "../../../utils/request";
import "./index.scss";


const UserPhotoGallery = ({alias, pageLink}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: `/api/photogallery/gallery?alias=${alias}&elem_count=12`
        }, data => {
            if (data.photos.length) {
                const {photos} = data;
                let imagesArr = [];

                for(let i = 0; i < 12; i++) {
                    if(photos[i]) {
                        imagesArr.push({
                            id: photos[i].id,
                            src: photos[i].link,
                            thumbnail: photos[i].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[i].caption
                        });
                    } else {
                        imagesArr.push({
                            id: i,
                            src: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnail: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnailWidth: 88,
                            thumbnailHeight: 88
                        });
                    }
                }

                setImages(imagesArr);
            }
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    const squareStyle = () => {
        return {
            height: '88px',
            width: '88px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    };

    return (
        <Card className="user-gallery">
            <div className="user-gallery__header">
                <h4 className="user-gallery__title">Фотогалерея</h4>
                <Link to={pageLink}>Смотреть все</Link>
            </div>
            {loading ?
                <Loading inline={true} /> :
                <Gallery
                    items={images}
                    backdropClosesModal={true}
                    enableImageSelection={false}
                    withLoading={false}
                    rowHeight={89}
                    thumbnailStyle={squareStyle}
                />
            }
        </Card>
    )
};

export default React.memo(UserPhotoGallery);