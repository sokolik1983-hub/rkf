import React from "react";
import { Link } from 'react-router-dom'
import './Exhibition.scss'

function FeaturedExhibition({ id, exhibition_picture_link, exhibition_name, exhibition_description }) {
    const link = '/exhibitions/' + id + '/details';
    const pictureLink = exhibition_picture_link ? exhibition_picture_link : '/static/images/exhibitions/default.png';

    return (

        <Link to={link}  className="FeaturedExhibition">
            <div className="FeaturedExhibition__img"  style={{ backgroundImage: `url(${pictureLink})` }}/>
            <div className="FeaturedExhibition__content">
                <h3 className="FeaturedExhibition__title">{exhibition_name}</h3>
                <p className="FeaturedExhibition__description">{exhibition_description}</p>
            </div>
        </Link>

    )
};

export default React.memo(FeaturedExhibition)