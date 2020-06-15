import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import { DEFAULT_IMG } from "../../../../appConfig";
import { connectFilters } from "../../connectors";
import { getEmptyFilters } from "../../utils";


const ListItem = ({ is_active, is_active_member, setFilters, city, cityId, federation_name, alias, owner, name, content, logo, federation_link }) => {
    const handleCityClick = (e) => {
        e.preventDefault();
        setFilters({
            ...getEmptyFilters(),
            city_ids: [cityId],
            page: 1
        });
    };

    const footprint = <img className="ListItem__active-member" src="/static/icons/footprint.svg" title="Активный пользователь RKF.Online" alt="Активный пользователь RKF.Online" />;

    return (
        <Card className="ListItem">
            <div className="ListItem__content">
                <div className="ListItem__content-inner">
                    <div className="ListItem__header">
                        {is_active ?
                            <Link className="ListItem__author" to={`/nursery/${alias}`}>
                                <div className="ListItem__logo" style={{
                                    backgroundImage: `url(${logo ? logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{name ? name : 'Название клуба отсутствует'}</span>
                                {!!is_active_member && footprint}
                            </Link> :
                            <p className="ListItem__author">
                                <span className="ListItem__logo" style={{
                                    backgroundImage: `url(${logo ? logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{name ? name : 'Название клуба отсутствует'}</span>
                                {!!is_active_member && footprint}
                            </p>
                        }
                        {city && <a onClick={handleCityClick} className="ListItem__city" href="/" >{city}</a>}
                    </div>
                    <div className="ListItem__info">
                        <div>
                            <span className="ListItem__subtitle">Федерация</span>
                            <p>{federation_name && federation_link ? <Link to={`/${federation_link}`}>{federation_name}</Link> : 'Отсутствует'}</p>
                        </div>
                        {is_active &&
                            <div>
                                <span className="ListItem__subtitle">Руководитель клуба</span>
                                <p>{owner ? <Link to={`/nursery/${alias}`}>{owner}</Link> : 'Отсутствует'}</p>
                            </div>
                        }
                    </div>
                    {is_active ?
                        <div className="ListItem__text">{content}</div> :
                        <div className="ListItem__text centered">Питомник не прошёл регистрацию в электронной системе РКФ</div>
                    }
                    <div className="ListItemMobile">
                        <div className="ListItemMobile__header">
                            {city && <a onClick={handleCityClick} className="ListItem__city" href="/" >{city}</a>}
                        </div>
                        {is_active ?
                            <Link className="ListItemMobile__author" to={`/nursery/${alias}`}>
                                <div className="ListItemMobile__author-logo" style={{
                                    backgroundImage: `url(${logo ? logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{name ? name : 'Название клуба отсутствует'}</span>
                                {!!is_active_member && footprint}
                            </Link> :
                            <p className="ListItemMobile__author">
                                <span className="ListItemMobile__author-logo" style={{
                                    backgroundImage: `url(${logo ? logo : DEFAULT_IMG.clubAvatar})`
                                }} />
                                <span>{name ? name : 'Название клуба отсутствует'}</span>
                                {!!is_active_member && footprint}
                            </p>
                        }
                        <div className="ListItemMobile__info">
                            {is_active && <span>{owner ? <Link to={`/nursery/${alias}`}>{owner}</Link> : 'Отсутствует'}</span>}
                            <span>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Отсутствует'}</span>
                        </div>
                        {!is_active && <div className="ListItemMobile__text">Питомник не прошёл регистрацию<br /> в электронной системе РКФ</div>}
                    </div>
                </div>
                <Link className="ListItem__show-all" to={`/nursery/${alias}`}>Подробнее</Link>
            </div>
        </Card>
    )
};

export default connectFilters(React.memo(ListItem));