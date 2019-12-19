import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import {Request} from "../../../../utils/request";
import {endpointGetExhibitions} from "../../config";
import {DEFAULT_IMG} from "../../../../appConfig";
import './index.scss';


const ClubFutureExhibitions = ({clubId}) => {
    const [exhibitions, setExhibitions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: `${endpointGetExhibitions}?ClubId=${clubId}`
        }, data => {
            setExhibitions(data.length ? data.slice(0, 3) : null);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, [clubId]);

    return loading ?
        <Loading /> :
        exhibitions ?
            <Card className="club-page__exhibitions">
                <h4 className="club-page__exhibitions-title">Выставки</h4>
                <ul className="club-page__exhibitions-list">
                    {exhibitions.map(exhibition => (
                        <li className="club-page__exhibitions-item" key={exhibition.id}>
                            <Link to={`/exhibitions/${exhibition.id}/details`} className="future-exhibition">
                                <div
                                    className="future-exhibition__img"
                                    style={{backgroundImage: `url(${exhibition.exhibition_picture_link ? 
                                            exhibition.exhibition_picture_link : 
                                            DEFAULT_IMG.exhibitionPicture})`}}
                                />
                                <div className="future-exhibition__content">
                                    <h5 className="future-exhibition__title">{exhibition.exhibition_name}</h5>
                                    <p className="future-exhibition__description">{exhibition.exhibition_description}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Card> :
            null
};

export default React.memo(ClubFutureExhibitions);