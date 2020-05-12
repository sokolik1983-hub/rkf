import React from "react";
import { Link } from "react-router-dom";
import { getLocalizedMonth } from "utils/datetime";
import { formatText } from "utils";
import './index.scss';
import { DEFAULT_IMG } from "../../../../appConfig";

const ListItem = ({ setNewsFilter, citiesDict, currentActiveType, setPage, club_name, city, date, alias, logo_link, photo, text, url }) => {
    const formattedDate = `${new Date(date).getDate()} ${getLocalizedMonth(new Date(date))} ${new Date(date).getFullYear()}`;

    const handleCityChange = e => {
        const cityObj = {
            label: city,
            value: citiesDict.filter(c => c.label === city)[0].value
        }
        setNewsFilter({ city: cityObj, activeType: currentActiveType });
        setPage(1);
    };

    return <div className="list-item__wrap">
        {photo && <Link to={url} className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
        <div className="list-item__content">
            <div className="list-item__head">
                <div className="list-item__club">
                    <Link to={alias}>
                        <div className="list-item__club-logo" style={{
                            background: `url(${logo_link
                                ? logo_link
                                : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                        }} />
                    </Link>
                    <span className="list-item__club-name">
                        <Link to={alias}>{club_name}</Link>
                        <span>{formattedDate}</span>
                    </span>
                </div>
                <span className="list-item__city" onClick={handleCityChange}>
                    {city}
                </span>
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