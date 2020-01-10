import React from "react";
import {Link} from "react-router-dom";
import {formatDateTime, formatDateWithLocaleStringFull} from "../../utils/datetime";
import {formatText} from "../../utils";
import './index.scss';


const ListItem = ({id, title, city, date, isFullDate = true, alias, photo, text, url, removable, onDelete}) => (
    <>
        <div className="list-item__head">
            <div className="list-item__head-info">
                {title &&
                    alias ?
                        <div className="list-item__about">
                            <h4 className="list-item__author"><a href={`/${alias}`}>{title}</a></h4>
                            {city && <p className="list-item__city">{city}</p>}
                        </div> :
                        <h4 className="list-item__author">{title}</h4>
                }
                <span className="list-item__date">
                    {isFullDate ? formatDateTime(date) : formatDateWithLocaleStringFull(new Date(date))}
                </span>
            </div>
            {removable && <button className="list-item__remove" onClick={() => onDelete(id)} title="Удалить">✕</button>}
        </div>
        <Link className="list-item__body" to={url}>
            {photo && <div className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
            <div className="list-item__info">
                <p className={photo ? 'list-item__text' : 'list-item__text-short'} dangerouslySetInnerHTML={{__html: formatText(text)}} />
                <span className="list-item__show-all">Подробнее</span>
            </div>
        </Link>
    </>
);

export default React.memo(ListItem);