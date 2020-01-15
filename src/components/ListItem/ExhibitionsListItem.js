import React from "react";
import { Link } from "react-router-dom";
import { formatDateWithLocaleStringFull } from "../../utils/datetime";
import { formatText } from "../../utils";
import Card from "../Card";
import { connectFilters } from "pages/Exhibitions/connectors";
import { getEmptyFilters } from "pages/Exhibitions/utils";
import './index.scss';


const ExhibitionsListItem = ({ id, title, city, club_name, club_alias, date, photo, url, setFiltersSuccess }) => {
    const handleCityClick = (e) => {
        e.preventDefault();
        setFiltersSuccess({
            ...getEmptyFilters(),
            ExhibitionName: city,
            PageNumber: 1
        });
    };
    return <Card className="list-item__wrap">
        {photo && <Link className="list-item__photo-wrap" to={url}>
            <div className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />
        </Link>}
        <div className="list-item__info">
            <div className="list-item__info-inner">
                <div className="list-item__header">
                    <div>
                        <h4><a className="list-item__author" href={`/${club_alias}`}>{club_name}</a></h4>
                        <a className="list-item__city" href="/" onClick={handleCityClick} >{city}</a>
                    </div>
                    <span className="list-item__date">
                        {formatDateWithLocaleStringFull(date)}
                    </span>
                </div>
                <Link className="list-item__title" to={url}>{formatText(title)}</Link>
            </div>
            <Link className="list-item__show-all" to={url}>Подробнее</Link>
        </div>
    </Card>
};

export default connectFilters(React.memo(ExhibitionsListItem));