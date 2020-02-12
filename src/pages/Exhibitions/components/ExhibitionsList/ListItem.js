import React from "react";
import { Link } from "react-router-dom";
import { formatDateCommon } from 'utils/datetime';
import { formatText } from "utils";
import Card from "components/Card";
import { connectFilters } from "pages/Exhibitions/connectors";
import { getEmptyFilters } from "pages/Exhibitions/utils";
import { getDictElement, useDictionary } from "apps/Dictionaries";

const ListItem = ({ id, title, city, club_name, club_alias, club_logo, dates, photo, url, ranks, federation_name, federation_link, setFiltersSuccess }) => {
    const { dictionary } = useDictionary('rank_type');
    const getRanks = () => ranks.map(r => getDictElement(dictionary, r)).join(', ');

    const getDate = () => {
        const f = dates[0]; // start date
        const l = dates[dates.length - 1]; // end date
        return dates.length === 1
            ? formatDateCommon(new Date(`${f.year}/${f.month}/${f.day}`))
            : formatDateCommon(new Date(`${f.year}/${f.month}/${f.day}`)) + ' - ' + formatDateCommon(new Date(`${l.year}/${l.month}/${l.day}`))
    };

    const handleCityClick = (e) => {
        e.preventDefault();
        setFiltersSuccess({
            ...getEmptyFilters(),
            ExhibitionName: city,
            PageNumber: 1
        });
    };

    return <Card className="ListItem">
        {photo && <Link className="ListItem__photo-wrap" to={url}>
            <div className="ListItem__photo" style={{ backgroundImage: `url(${photo})` }} />
        </Link>}
        <div className="ListItem__content">
            <div className="ListItem__content-inner">
                <div className="ListItem__header">
                    <div>
                        <Link className="ListItem__title" to={url} title={title}>{formatText(title)}</Link>
                    </div>
                    <a className="ListItem__city" href="/" onClick={handleCityClick} title={city}>{city}</a>
                </div>
                <div className="ListItem__author">
                    <span className="ListItem__subtitle">Организатор</span>
                    <Link to={`/${club_alias}`}>
                        <div className="ListItem__club-logo" style={{
                            backgroundImage: `url(${club_logo ? club_logo : '/static/images/noimg/no-avatar.png'})`
                        }} />
                        <p className="ListItem__club-name">{club_name}</p>
                    </Link>
                </div>
                <div className="ListItem__info">
                    <div>
                        <span className="ListItem__subtitle">Дата проведения</span>
                        <p>{getDate()}</p>
                    </div>
                    <div>
                        <span className="ListItem__subtitle">Федерация</span>
                        <p>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Отсутствует'}</p>
                    </div>
                    <div>
                        <span className="ListItem__subtitle">Ранг</span>
                        <p>{getRanks()}</p>
                    </div>
                </div>

                <div className="ListItemMobile">
                    <div className="ListItemMobile__date">
                        <span>{getDate()}</span>
                        <span>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Отсутствует'}</span>
                    </div>
                    <Link className="ListItemMobile__author" to={`/${club_alias}`}>
                        <div style={{
                            backgroundImage: `url(${club_logo ? club_logo : '/static/images/noimg/no-avatar.png'})`
                        }} />
                        <span>{club_name}</span>
                    </Link>
                </div>
            </div>
            <Link className="ListItem__show-all" to={url}>Подробнее</Link>
        </div>
    </Card>
};

export default connectFilters(React.memo(ListItem));