import React from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import {DEFAULT_IMG} from "../../appConfig";
import {formatDateCommon} from "../../utils/datetime";
import {formatText} from "../../utils";
import {getDictElement} from "../../dictionaries";


const CardExhibition = ({
                         title,
                         city,
                         club_name,
                         club_alias,
                         club_logo,
                         dates,
                         photo,
                         url,
                         ranks,
                         federation_name,
                         federation_link,
                         dictionary,
                         user,
                         setFilters}) => {
    const getRanks = () => ranks.map(r => getDictElement(dictionary, r)).join(', ');

    const getDate = () => {
        const startDate = dates[0];
        const endDate = dates[dates.length - 1];
        return dates.length === 1
            ? formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`))
            : formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`)) +
            ' - ' + formatDateCommon(new Date(`${endDate.year}/${endDate.month}/${endDate.day}`));
    };

    const handleCityClick = e => {
        e.preventDefault();
        setFilters({ExhibitionName: city});
    };

    return (
        <Card className="card-exhibition">
            {photo && <Link className="card-exhibition__photo-wrap" to={url}>
                <div className="card-exhibition__photo" style={{ backgroundImage: `url(${photo})` }} />
            </Link>}
            <div className="card-exhibition__content">
                <div className="card-exhibition__content-inner">
                    <div className="card-exhibition__header">
                        <div>
                            <Link className="card-exhibition__title" to={url} title={title}>{formatText(title)}</Link>
                        </div>
                        <a className="card-exhibition__city" href="/" onClick={handleCityClick} title={city}>{city}</a>
                    </div>
                    <div className="card-exhibition__author">
                        <span className="card-exhibition__subtitle">Организатор</span>
                        <Link to={`/${club_alias}`}>
                            <div className="card-exhibition__club-logo" style={{
                                backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                            }} />
                            <p className="card-exhibition__club-name">
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
                    <div className="card-exhibition__info">
                        <div>
                            <span className="card-exhibition__subtitle">Дата проведения</span>
                            <p>{getDate()}</p>
                        </div>
                        <div>
                            <span className="card-exhibition__subtitle">Федерация</span>
                            <p>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Федерация не указана'}</p>
                        </div>
                        <div>
                            <span className="card-exhibition__subtitle">Ранг</span>
                            <p>{getRanks()}</p>
                        </div>
                    </div>
                </div>

                <div className="card-exhibition__mobile">
                    <Link to={url} title={title} className="card-exhibition__mobile-title">{formatText(title)}</Link>
                    <div className="card-exhibition__mobile-info">
                        <Link to="/"
                              className="card-exhibition__mobile-info-city"
                              onClick={handleCityClick}
                              title={city}
                        >{city}</Link>
                        <p className="card-exhibition__mobile-info-date">{getDate()}</p>
                        {getRanks() &&
                            <p className="card-exhibition__mobile-info-rank">{getRanks()}</p>
                        }
                    </div>
                    <div className="card-exhibition__mobile-about">
                        <Link to={`/${club_alias}`} className="card-exhibition__mobile-about-organization">
                            <span className="card-exhibition__mobile-about-logo" style={{
                                backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                            }} />
                            <p className="card-exhibition__mobile-about-name" title={club_name}>
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
                            <Link to={federation_link} className="card-exhibition__mobile-about-federation">{federation_name}</Link>
                        }
                    </div>
                </div>
                <Link className="card-exhibition__show-all" to={url}>Подробнее</Link>
            </div>
        </Card>
    )
};

export default React.memo(CardExhibition);