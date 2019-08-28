import React from "react";
import { Link } from 'react-router-dom'
import './HomeFeaturedExhibition.scss'

function HomepageExhibition({ id, exhibition_picture_link, exhibition_name, exhibition_description }) {
    const link = '/exhibitions/' + id + '/details';
    return (

        <div className="HomeFeaturedExhibition">
            <div className="HomeFeaturedExhibition__image-wrap">
                <img src={exhibition_picture_link} alt="" />
            </div>
            <div className="HomeFeaturedExhibition__wrapper">
                <div className="HomeFeaturedExhibition__title">{exhibition_name}</div>
                <div className="HomeFeaturedExhibition__description">{exhibition_description}</div>
                <Link to={link} className="HomeFeaturedExhibition__link">Смотреть</Link>
            </div>
        </div>

    )
};

export default React.memo(HomepageExhibition)