import React from 'react';
import { Link } from "react-router-dom";
import { formatDateCommon } from 'utils/datetime';
import './styles.scss';
import {DEFAULT_IMG} from "../../../../appConfig";

const ExhibitionCard = ({ club_alias, club_name, club_logo, id, city_name, exhibition_name, exhibition_picture_link, date, date_end }) => {
    return <div className="ExhibitionCard">
        <div className="ExhibitionCard__image" style={{ background: `url(${exhibition_picture_link ? exhibition_picture_link : '/static/images/exhibitions/default.png'}) center center/cover no-repeat` }} />
        <div className="ExhibitionCard__content">
            <div>
                <Link className="ExhibitionCard__link" to={`/exhibitions/${id}`}>{exhibition_name}</Link>
                <div className="ExhibitionCard__content-block">
                    <h5>Организатор</h5>
                    <Link to={club_alias} className="ExhibitionCard__club">
                        <div className="ExhibitionCard__club-logo" style={{
                            background: `url(${club_logo
                                ? club_logo
                                : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                        }} />
                        <p className="ExhibitionCard__club-name">{club_name}</p>
                    </Link>
                </div>
                <div className="ExhibitionCard__content-block">
                    <h5 className="ExhibitionCard__content-block-date">Дата проведения</h5>
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
            </div>
            <Link className="ExhibitionCard__button" to={`/exhibitions/${id}`}>Подробнее</Link>
        </div>
    </div >
};

export default ExhibitionCard;