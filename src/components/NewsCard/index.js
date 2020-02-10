import React from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import {getLocalizedMonth} from "../../utils/datetime";
import {formatText} from "../../utils";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const NewsCard = ({id, club_name, fact_city_name, create_date, alias, logo_link, picture_link, content}) => (
    <Card className="news-card">
        {picture_link && <Link to={`/news/${id}`} className="news-card__photo" style={{backgroundImage: `url(${picture_link})`}} />}
        <div className="news-card__content">
            <div className="news-card__head">
                <Link to={alias} className="news-card__club">
                    <div className="news-card__club-logo" style={{
                        background: `url(${logo_link
                            ? logo_link
                            : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                    }} />
                    <div className="news-card__club-info">
                        <p className="news-card__club-name">{club_name}</p>
                        <p className="news-card__date">
                            {`${new Date(create_date).getDate()} ${getLocalizedMonth(new Date(create_date))} ${new Date(create_date).getFullYear()}`}
                        </p>
                    </div>
                </Link>
                {fact_city_name &&
                    <p className="news-card__city">
                        {fact_city_name}
                    </p>
                }
            </div>
            <div className="news-card__body">
                <p className="news-card__text" dangerouslySetInnerHTML={{__html: formatText(content)}} />
                <Link to={`/news/${id}`} className="news-card__show-all">Подробнее</Link>
            </div>
        </div>
    </Card>
);

export default React.memo(NewsCard);