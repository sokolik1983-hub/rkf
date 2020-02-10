import React from "react";
import {Link} from "react-router-dom";
import {formatDateCommon} from "../../utils/datetime";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const ExhibitionCard = ({club_alias, club_name, club_logo, id, city_name, exhibition_name, exhibition_picture_link, date, date_end}) => (
    <div className="exhibition-card">
        <div className="exhibition-card__image"
             style={{background: `url(${exhibition_picture_link
                     ? exhibition_picture_link
                     : DEFAULT_IMG.exhibitionPicture}) center center/cover no-repeat`}}
        />
        <div className="exhibition-card__content">
            <div>
                <Link className="exhibition-card__link" to={`/exhibitions/${id}`}>{exhibition_name}</Link>
                <div className="exhibition-card__content-block">
                    <h5>Организатор</h5>
                    {club_alias ?
                        <Link to={club_alias} className="exhibition-card__club">
                            <div className="exhibition-card__club-logo" style={{
                                background: `url(${club_logo
                                    ? club_logo
                                    : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                            }} />
                            <p className="exhibition-card__club-name">{club_name}</p>
                        </Link> :
                        <p className="exhibition-card__club">
                            <span className="exhibition-card__club-logo" style={{
                                background: `url(${club_logo
                                    ? club_logo
                                    : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                            }} />
                            <span className="exhibition-card__club-name">{club_name}</span>
                        </p>
                    }
                </div>
                <div className="exhibition-card__content-block">
                    <h5 className="exhibition-card__content-block-date">Дата проведения</h5>
                    <span className="exhibition-card__content-block-info">
                        {date === date_end
                            ? formatDateCommon(new Date(date))
                            : `${formatDateCommon(new Date(date))} - ${formatDateCommon(new Date(date_end))}`
                        }
                    </span>
                </div>
                <div className="exhibition-card__content-block">
                    <h5>Место проведения</h5>
                    <span className="exhibition-card__content-block-info">{city_name ? city_name : 'Не указано'}</span>
                </div>
            </div>
            <Link className="exhibition-card__button" to={`/exhibitions/${id}`}>Подробнее</Link>
        </div>
    </div>
);

export default React.memo(ExhibitionCard);