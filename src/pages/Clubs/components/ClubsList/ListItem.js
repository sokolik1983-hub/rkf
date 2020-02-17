import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import {DEFAULT_IMG} from "../../../../appConfig";
import {connectFilters} from "../../connectors";
import {getEmptyFilters} from "../../utils";


const ListItem = ({is_active, setFilters, city, cityId, federation_name, club_alias, club_owner, club_name, content, club_logo, federation_link}) => {
    const handleCityClick = (e) => {
        e.preventDefault();
        setFilters({
            ...getEmptyFilters(),
            city_ids: [cityId],
            page: 1
        });
    };

    return (
        <Card className="ListItem">
            <div className="ListItem__content">
                <div className="ListItem__content-inner">
                    <div className="ListItem__header">
                        {is_active ?
                            <Link className="ListItem__author" to={`/${club_alias}`}>
                                <div className="ListItem__club-logo" style={{
                                    backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{club_name ? club_name : 'Название клуба отсутствует'}</span>
                            </Link> :
                            <p className="ListItem__author">
                                <span className="ListItem__club-logo" style={{
                                    backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{club_name ? club_name : 'Название клуба отсутствует'}</span>
                            </p>
                        }
                        {city && <a onClick={handleCityClick} className="ListItem__city" href="/" >{city}</a>}
                    </div>
                    <div className="ListItem__info">
                        <div>
                            <span className="ListItem__subtitle">Федерация</span>
                            <p>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Отсутствует'}</p>
                        </div>
                        {is_active &&
                            <div>
                                <span className="ListItem__subtitle">Руководитель клуба</span>
                                <p>{club_owner ? <Link to={`/${club_alias}`}>{club_owner}</Link> : 'Отсутствует'}</p>
                            </div>
                        }
                    </div>
                    {is_active ?
                        <div className="ListItem__text">{content}</div> :
                        <div className="ListItem__text centered">Клуб не прошёл регистрацию в электронной системе РКФ</div>
                    }
                    <div className="ListItemMobile">
                        <div className="ListItemMobile__header">
                            {city && <a onClick={handleCityClick} className="ListItem__city" href="/" >{city}</a>}
                        </div>
                        {is_active ?
                            <Link className="ListItemMobile__author" to={`/${club_alias}`}>
                                <div className="ListItemMobile__author-logo" style={{
                                    backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{club_name ? club_name : 'Название клуба отсутствует'}</span>
                            </Link> :
                            <p className="ListItemMobile__author">
                                <span className="ListItemMobile__author-logo" style={{
                                    backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{club_name ? club_name : 'Название клуба отсутствует'}</span>
                            </p>
                        }
                        <div className="ListItemMobile__info">
                            {is_active && <span>{club_owner ? <Link to={`/${club_alias}`}>{club_owner}</Link> : 'Отсутствует'}</span>}
                            <span>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Отсутствует'}</span>
                        </div>
                        {!is_active && <div className="ListItemMobile__text">Клуб не прошёл регистрацию<br /> в электронной системе РКФ</div>}
                    </div>
                </div>
                {is_active && <Link className="ListItem__show-all" to={club_alias}>Подробнее</Link>}
            </div>
        </Card>
    )
};

export default connectFilters(React.memo(ListItem));