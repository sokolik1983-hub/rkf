import React from "react";
import { Link } from 'react-router-dom'
import './HomepageExhibition.scss'

function HomepageExhibition({ id, exhibition_picture_link, exhibition_name, exhibition_description }) {
    const link = '/exhibitions/' + id + '/details';
    return (

        <div className="FeaturedExhibition">
            <div className="FeaturedExhibition__image-wrap">
                <img src={exhibition_picture_link} alt="" />
            </div>
            <div className="FeaturedExhibition__wrapper">
                <div className="FeaturedExhibition__title">{exhibition_name}</div>
                <div className="FeaturedExhibition__description">{exhibition_description}</div>
                <Link to={link} className="FeaturedExhibition__link">Смотреть</Link>
            </div>
        </div>

    )
};

export default React.memo(HomepageExhibition)