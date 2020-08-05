import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import Share from "../../../../components/Share";
import {DEFAULT_IMG} from "../../../../appConfig";
import {connectFilters} from "../../connectors";


const ListItem = ({alias,
                   logo,
                   name,
                   user_type,
                   is_active,
                   is_active_member,
                   city_name,
                   city_id,
                   owner_name,
                   owner_position,
                   federation_name,
                   federation_alias,
                   content,
                   setFilters}) => {
    const url = user_type === 4 ? `/kennel/${alias}` : `/${alias}`;

    return (
        <Card className="item-card">
            <div className="item-card__content">
                <div className="item-card__header">
                    {is_active ?
                        <Link className="item-card__author" to={url}>
                            <span className="item-card__logo" style={{
                                backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`
                            }} />
                            <span className="item-card__name">
                                {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                    <>
                                        <span>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>
                                        &nbsp;
                                    </>
                                }
                                {name}
                            </span>
                            {!!is_active_member &&
                                <img
                                    className="item-card__active-member"
                                    src="/static/icons/footprint.svg"
                                    title="Активный пользователь RKF.Online"
                                    alt="Активный пользователь RKF.Online"
                                />
                            }
                        </Link> :
                        <p className="item-card__author">
                            <span className="item-card__logo" style={{
                                backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`
                            }} />
                            <span className="item-card__name">
                                {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                    <>
                                        <span>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>
                                        &nbsp;
                                    </>
                                }
                                {name}
                            </span>
                            {!!is_active_member &&
                                <img
                                    className="item-card__active-member"
                                    src="/static/icons/footprint.svg"
                                    title="Активный пользователь RKF.Online"
                                    alt="Активный пользователь RKF.Online"
                                />
                            }
                        </p>
                    }
                    {city_name &&
                        <span className="item-card__city" onClick={() =>setFilters({city_ids: [city_id]})}>
                            {city_name}
                        </span>
                    }
                </div>
                <div className="item-card__info">
                    <div className="item-card__info-item">
                        <p className="item-card__subtitle">Федерация</p>
                        <p>
                            {federation_name && federation_alias ? <Link to={`/${federation_alias}`}>{federation_name}</Link> : 'Отсутствует'}
                        </p>
                    </div>
                    {is_active &&
                        <div className="item-card__info-item">
                            <span className="item-card__subtitle">{owner_position || 'Контактное лицо'}</span>
                            <p>{owner_name ? <Link to={url}>{owner_name}</Link> : 'Отсутствует'}</p>
                        </div>
                    }
                </div>
                <p className={`item - card__text${!is_active ? ' centered' : ''}`}>
                    {is_active ? content : 'Организация не прошла регистрацию в электронной системе РКФ'}
                </p>
            </div>
            <div className="item-card__controls">
                <Link className="item-card__show-all" to={url}>Подробнее...</Link>
                <Share url={`https://rkf.online${url}`} />
            </div>
        </Card>
    )
};

export default connectFilters(React.memo(ListItem));