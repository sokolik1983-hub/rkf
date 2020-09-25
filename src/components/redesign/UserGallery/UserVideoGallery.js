import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Request } from "utils/request";
import { DEFAULT_IMG } from "appConfig";
import "./index.scss";

const UserVideoGallery = ({ alias, setShowModal, isKennel }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        setLoading(true);
        Request({
            url: `/api/videogallery/gallery?alias=${alias}`,
            method: 'GET'
        }, data => {
            setVideos(data);
            setLoading(false);
        },
            error => {
                //handleError(error);
                setLoading(false);
            });
    };

    return (
        <Card className="user-gallery__wrap videogallery">
            <div className="user-gallery__header">
                <h4 className="user-gallery__title">Видеозаписи</h4>
                <Link to={`/${isKennel ? 'kennel/' + alias : alias}/video`}>Смотреть все</Link>
            </div>
            {
                loading
                    ? <Loading inline={true} />
                    : videos.length
                        ? videos.slice(0, 2).map(v => <div key={v.id} className="VideoGallery__item">
                            <img src={v.cover_link} onClick={() => setShowModal({ type: 'openVideo', item: v })} alt="" />
                            <h5 className="VideoGallery__item-name">{v.name}</h5>
                        </div>)
                        : <div className="ReactGridGallery__disabled">
                        <h4 className="ReactGridGallery__disabled-text">Не добавлено ни одной видеозаписи</h4>
                        <img className="ReactGridGallery__disabled-img" src={DEFAULT_IMG.emptyGallery} alt="У вас нет видеозаписей" />
                    </div>
            }
        </Card>
    );

};

export default UserVideoGallery;