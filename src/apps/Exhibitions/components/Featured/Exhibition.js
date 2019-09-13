import React from "react";
import { Link } from 'react-router-dom'
import './Exhibition.scss'

function FeaturedExhibition({ id, exhibition_picture_link, exhibition_name, exhibition_description }) {
    const link = '/exhibitions/' + id + '/details';
    const pictureLink = exhibition_picture_link ? exhibition_picture_link : '/static/images/exhibitions/default.png';

    return (

        <Link to={link} style={{ backgroundImage: `url(${pictureLink})` }} className="FeaturedExhibition">
            <div className="FeaturedExhibition__shadow" />
            <div className="FeaturedExhibition__title">{exhibition_name}</div>
            <div className="FeaturedExhibition__description">{exhibition_description}</div>
        </Link>

    )
};

export default React.memo(FeaturedExhibition)