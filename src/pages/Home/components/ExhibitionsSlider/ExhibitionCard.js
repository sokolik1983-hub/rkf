import React from 'react';
import { Link } from "react-router-dom";
import { formatDateCommon } from 'utils/datetime';
import './styles.scss';

const ExhibitionCard = ({ club_alias, club_name, club_logo, id, city_name, exhibition_name, picture_link, date, date_end }) => {
    return <div className="ExhibitionCard">
        <div className="ExhibitionCard__image" style={{ background: `url(${picture_link ? picture_link : '/static/images/exhibitions/default.png'}) center center/cover no-repeat` }} />
        <div className="ExhibitionCard__content">
            <Link className="ExhibitionCard__link" to={`/exhibitions/${id}`}>{exhibition_name}</Link>
            <div className="ExhibitionCard__content-block">
                <h5>Организатор</h5>
                <div className="ExhibitionCard__club">
                    <Link to={club_alias}>
                        <div className="ExhibitionCard__club-logo" style={{
                            background: `url(${club_logo
                                ? club_logo
                                : '/static/images/noimg/no-avatar.png'}) center center/cover no-repeat`
                        }} />
                    </Link>
                    <span className="ExhibitionCard__club-name">
                        <Link to={club_alias}>{club_name}</Link>
                    </span>
                </div>
            </div>
            <div className="ExhibitionCard__content-block">
                <h5>Дата проведения</h5>
                <span>
                    {
                        date === date_end
                            ? formatDateCommon(new Date(date))
                            : `${formatDateCommon(new Date(date))} - ${formatDateCommon(new Date(date_end))}`
                    }
                </span>
            </div>
            <div className="ExhibitionCard__content-block">
                <h5>Место проведения</h5>
                <span>{city_name}</span>
            </div>
            <Link className="ExhibitionCard__button" to={`/exhibitions/${id}`}>Подробнее</Link>
        </div>
    </div >
};

export default ExhibitionCard;