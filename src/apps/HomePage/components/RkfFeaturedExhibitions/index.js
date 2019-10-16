import React from 'react';
import {Link} from "react-router-dom";
import FeaturedExhibition from './Exhibition';
import {connectFeaturedExhibitionsList} from '../../connectors.js';


function RkfFeaturedExhibitions({exhibitions}) {
    return (
        exhibitions && !!exhibitions.length ?
            <>
                {exhibitions.map(exhibition =>
                    <FeaturedExhibition
                        key={exhibition.id}
                        {...exhibition}
                    />
                )}
                <Link className="NewsList__button" to="/exhibitions">
                    Смотреть все выставки
                </Link>
            </> :
            <h3>Не найдено анонсов выставок</h3>
    );
}

export default connectFeaturedExhibitionsList(RkfFeaturedExhibitions);
