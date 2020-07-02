import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import {formatDateCommon} from "../../../../utils/datetime";
import {formatText} from "../../../../utils";
import {setFiltersToUrl, getEmptyFilters} from "../../utils";
import {getDictElement} from "../../../../dictionaries";
import {DEFAULT_IMG} from "../../../../appConfig";

const ListItem = ({title, city, club_name, club_alias, club_logo, dates, photo, url, ranks, federation_name, federation_link, dictionary, user}) => {
    const getRanks = () => ranks.map(r => getDictElement(dictionary, r)).join(', ');

    const getDate = () => {
        const f = dates[0]; // start date
        const l = dates[dates.length - 1]; // end date
        return dates.length === 1
            ? formatDateCommon(new Date(`${f.year}/${f.month}/${f.day}`))
            : formatDateCommon(new Date(`${f.year}/${f.month}/${f.day}`)) + ' - ' + formatDateCommon(new Date(`${l.year}/${l.month}/${l.day}`))
    };

    const handleCityClick = e => {
        e.preventDefault();
        setFiltersToUrl({
            ...getEmptyFilters(),
            ExhibitionName: city
        });
    };

    return (
        <Card className="ListItem">
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
                                backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                            }} />
                            <p className="ListItem__club-name">
                                {(user === 3 || user === 4 || user === 5) &&
                                <>
                                    <span>{user === 3 ? 'Клуб' : user === 4 ? 'Питомник' : user === 5 ? 'Федерация' : ''}</span>
                                    &nbsp;
                                </>
                                }
                                {club_name}
                            </p>
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
                </div>

                <div className="ListItemMobile">
                    <Link to={url} title={title} className="ListItemMobile__title">{formatText(title)}</Link>
                    <div className="ListItemMobile__info">
                        <Link to="/"
                              className="ListItemMobile__info-city"
                              onClick={handleCityClick}
                              title={city}
                        >{city}</Link>
                        <p className="ListItemMobile__info-date">{getDate()}</p>
                        {getRanks() &&
                            <p className="ListItemMobile__info-rank">{getRanks()}</p>
                        }
                    </div>
                    <div className="ListItemMobile__about">
                        <Link to={`/${club_alias}`} className="ListItemMobile__about-organization">
                            <span className="ListItemMobile__about-logo" style={{
                                backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                            }} />
                            <p className="ListItemMobile__about-name" title={club_name}>
                                {(user === 3 || user === 4 || user === 5) &&
                                    <>
                                        <span>{user === 3 ? 'Клуб' : user === 4 ? 'Питомник' : user === 5 ? 'Федерация' : ''}</span>
                                        &nbsp;
                                    </>
                                }
                                {club_name}
                            </p>
                        </Link>
                        {federation_name && federation_link &&
                            <Link to={federation_link} className="ListItemMobile__about-federation">{federation_name}</Link>
                        }
                    </div>
                </div>
                <Link className="ListItem__show-all" to={url}>Подробнее</Link>
            </div>
        </Card>
    )
};

export default React.memo(ListItem);