import React from "react";
import {Link} from "react-router-dom";
import {formatDateTime, formatDateWithLocaleStringFull} from "../../utils/datetime";
import {formatText} from "../../utils";
import './index.scss';


const ListItem = ({title, date, isFullDate = true, alias, photo, text, url}) => (
    <>
        <div className="list-item__head">
            {title &&
                alias ?
                    <h4 className="list-item__author"><a href={`/${alias}`}>{title}</a></h4> :
                    <h4 className="list-item__author">{title}</h4>
            }
            <span className="list-item__date">
                {isFullDate ? formatDateTime(date) : formatDateWithLocaleStringFull(new Date(date))}
            </span>
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