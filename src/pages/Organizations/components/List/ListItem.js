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
                   phones,
                   mails,
                   setFilters}) => {
    const url = user_type === 4 ? `/kennel/${alias}` : user_type === 7 ? null : `/${alias}`;

    return (
        <Card className="item-card">
            <div className="item-card__content">
                <div className="item-card__header">
                    {is_active && url ?
                        <Link className="item-card__author" to={url}>
                            <span className="item-card__logo" style={{
                                backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`
                            }} />
                            <span className="item-card__name" title={name || 'Название отсутствует'}>
                                {(user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                    <>
                                        <span>
                                            {user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : user_type === 7 ? 'НКП' : ''}
                                        </span>
                                        &nbsp;
                                    </>
                                }
                                <span>{name || 'Название отсутствует'}</span>
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
                            <span className="item-card__name" title={name || 'Название отсутствует'}>
                                {(user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                    <>
                                        <span>
                                            {user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : user_type === 7 ? 'НКП' : ''}
                                        </span>
                                        &nbsp;
                                    </>
                                }
                                <span>{name || 'Название отсутствует'}</span>
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
                        <span className="item-card__city" title={city_name} onClick={() =>setFilters({city_ids: [city_id]})}>
                            {city_name}
                        </span>
                    }
                </div>
                <div className="item-card__info">
                    {(user_type !== 0 && user_type !== 5 && user_type !== 7) &&
                        <div className="item-card__info-item">
                            <span className="item-card__subtitle">Федерация</span>&nbsp;
                            <span>
                                {federation_name && federation_alias ?
                                    <Link to={`/${federation_alias}`}>{federation_name}</Link> : 'Отсутствует'
                                }
                            </span>
                        </div>
                    }
                    <div className="item-card__info-item">
                        <span className="item-card__subtitle">{owner_position || 'Контактное лицо'}</span>&nbsp;
                        <span>
                            {owner_name ?
                                url ?
                                    <Link to={url}>{owner_name}</Link> :
                                    owner_name :
                                'Отсутствует'
                            }
                        </span>
                    </div>
                    {phones && !!phones.length &&
                        <div className="item-card__info-item">
                            <p className="item-card__subtitle">Телефон</p>
                            {phones.map((item, i) =>
                                <p key={`phone-${i}`}>{item}</p>
                            )}
                        </div>
                    }
                    {mails && !!mails.length &&
                        <div className="item-card__info-item">
                            <p className="item-card__subtitle">E-mail</p>
                            {mails.map((item, i) =>
                                <a key={`mail-${i}`} href={`mailto:${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                </a>
                            )}
                        </div>
                    }
                </div>
                <p className={`item-card__text${!is_active ? ' _centered' : ''}`}>
                    {is_active ? content : 'Организация не прошла регистрацию в электронной системе РКФ'}
                </p>
            </div>
            <div className="item-card__controls">
                {url ?
                    <>
                        <Link className="item-card__show-all" to={url}>Подробнее...</Link>
                        <Share url={`https://rkf.online${url}`} />
                    </> :
                    <span className="item-card__show-all _disabled">Подробнее...</span>
                }
            </div>
        </Card>
    )
};

export default connectFilters(React.memo(ListItem));