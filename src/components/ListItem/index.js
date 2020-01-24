import React from "react";
import { Link } from "react-router-dom";
import { getLocalizedMonth } from "../../utils/datetime";
import { formatText } from "../../utils";
import './index.scss';

const ListItem = ({ id, club_name, city, date, alias, logo_link, photo, text, url, removable, onDelete }) => {
    const formattedDate = `${new Date(date).getDay()} ${getLocalizedMonth(new Date(date))} ${new Date(date).getFullYear()}`;
    return <div className="list-item__wrap">
        {photo && <Link to={url} className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
        <div className="list-item__content">
            <div className="list-item__head">
                <div className="list-item__head-info">
                    <div className="list-item__club">
                        <Link to={alias}>
                            <div className="list-item__club-logo" style={{
                                background: `url(${logo_link
                                    ? logo_link
                                    : '/static/images/noimg/no-avatar.png'}) center center/cover no-repeat`
                            }} />
                        </Link>
                        <span className="list-item__club-name">
                            <Link to={alias}>{club_name}</Link>
                            <span>{formattedDate}</span>
                        </span>
                    </div>
                    <span className="list-item__city">
                        {city}
                    </span>
                </div>
                {removable && <button className="list-item__remove" onClick={() => onDelete(id)} title="Удалить">✕</button>}
            </div>
            <div className="list-item__body">
                <div className="list-item__info">
                    <p className="list-item__text" dangerouslySetInnerHTML={{ __html: formatText(text) }} />
                    <Link to={url} className="list-item__show-all">Подробнее</Link>
                </div>
            </div>
        </div>
    </div>
};

export default React.memo(ListItem);