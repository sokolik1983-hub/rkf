import React, {useEffect, useState} from "react";
import Gallery from "react-grid-gallery";
import {Link} from "react-router-dom";
import Loading from "../../Loading";
import Card from "../../Card";
import {Request} from "../../../utils/request";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const UserPhotoGallery = ({alias, pageLink}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: `/api/photogallery/gallery?alias=${alias}&element_count=12`
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
                {!!images.length && <Link to={pageLink}>Смотреть все</Link>}
            </div>
            {loading ?
                <Loading inline={true} /> :
                images.length ?
                    <Gallery
                        images={images}
                        enableImageSelection={false}
                        backdropClosesModal={true}
                        rowHeight={89}
                        thumbnailStyle={squareStyle}
                        imageCountSeparator="&nbsp;из&nbsp;"
                    /> :
                    <div className="user-gallery__disabled">
                        <h4 className="user-gallery__disabled-text">Не добавлено ни одной фотографии</h4>
                        <img className="user-gallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет фотографий" />
                    </div>
            }
        </Card>
    )
};

export default React.memo(UserPhotoGallery);