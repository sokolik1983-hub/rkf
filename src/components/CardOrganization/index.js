import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import Share from "../Share";
import {ActiveUserMark, FederationChoiceMark} from "../Marks";
import { DEFAULT_IMG } from "../../appConfig";
import "./index.scss";


const CardOrganization = ({ alias,
    logo,
    name,
    user_type,
    is_active_member,
    active_rkf_user,
    city_name,
    city_id,
    owner_name,
    owner_position,
    federation_name,
    federation_alias,
    content,
    phones,
    mails,
    breeds,
    site,
    setFilters }) => {
    const url = user_type === 4 ? `/kennel/${alias}` : user_type === 7 ? null : `/${alias}`;

    return (
        <Card className="card-organization">
            <div className="card-organization__content">
                <div className="card-organization__header">
                    {url ?
                        <div className="card-organization__author">
                            <Link
                                to={url}
                                className={`card-organization__logo ${user_type === 3 || user_type === 4 ? `item-card__logo--club` : ``}`}
                                style={{
                                    backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`
                                }}
                            />
                            <div className="card-organization__name-wrap">
                                <div>
                                    <Link to={url} className="card-organization__name" title={name || 'Название отсутствует'}>
                                        {(user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                            <>
                                                <span>
                                                    {user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : user_type === 7 ? 'НКП' : ''}
                                                </span>
                                                &nbsp;
                                            </>
                                        }
                                        <span>{name || 'Название отсутствует'}</span>
                                    </Link>
                                    {active_rkf_user &&
                                        <ActiveUserMark/>
                                    }
                                    {is_active_member &&
                                        <FederationChoiceMark/>
                                    }
                                </div>
                                {(user_type !== 0 && user_type !== 5 && user_type !== 7) &&
                                    <div className="card-organization__info-item">
                                        <span>
                                            {federation_name && federation_alias ?
                                                <Link to={`/${federation_alias}`}>{federation_name}</Link> : 'Федерация не указана'
                                            }
                                        </span>
                                    </div>
                                }
                            </div>
                        </div> :
                        <p className="card-organization__author">
                            <span className="card-organization__logo" style={{
                                backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`
                            }} />
                            <span className="card-organization__name" title={name || 'Название отсутствует'}>
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
                            {active_rkf_user &&
                                <ActiveUserMark/>
                            }
                            {is_active_member &&
                                <FederationChoiceMark/>
                            }
                        </p>
                    }
                    {city_name &&
                        <span className="card-organization__city" title={city_name} onClick={() => setFilters ? setFilters({ city_ids: [city_id] }) : null}>
                            {city_name}
                        </span>
                    }
                </div>
                <div className="card-organization__info">
                    <div className="card-organization__info-item">
                        <span className="card-organization__subtitle">{owner_position || 'Контактное лицо'}</span>&nbsp;
                        <span>
                            {owner_name ?
                                url ?
                                    <Link to={url}>{owner_name}</Link> :
                                    owner_name :
                                'Не указано'
                            }
                        </span>
                    </div>
                    {user_type !== 0 && user_type !== 5 && phones && !!phones.length &&
                        <div className="card-organization__info-item">
                            <span className="card-organization__subtitle">Телефон</span>&nbsp;
                            <span>{phones.join(`, `)}</span>
                        </div>
                    }
                    {user_type !== 0 && user_type !== 5 && mails && !!mails.length &&
                        <div className="card-organization__info-item">
                            <span className="card-organization__subtitle">E-mail</span>&nbsp;
                            <span>{mails.join(`, `)}</span>
                        </div>
                    }
                    {user_type === 7 && site &&
                        <div className="card-organization__info-item">
                            <span className="card-organization__subtitle">Сайт</span>&nbsp;
                            <a href={site.includes('http') ? site : `http://${site}`} target="_blank" rel="noopener noreferrer">{site}</a>
                        </div>
                    }
                    {user_type === 4 && breeds && !!breeds.length &&
                        <div className="card-organization__info-item">
                            <span className="card-organization__subtitle">Породы</span>&nbsp;
                            <span>{breeds.slice(0, 4).join(`, `)}</span>
                        </div>
                    }
                </div>
                <p className="card-organization__text">
                    {content}
                </p>
            </div>
            <div className="card-organization__controls">
                {url ?
                    <>
                        <Link className="card-organization__show-all" to={url}>Подробнее...</Link>
                        <Share url={`https://rkf.online${url}`} />
                    </> :
                    <span className="card-organization__show-all _disabled">Подробнее...</span>
                }
            </div>
        </Card>
    )
};

export default React.memo(CardOrganization);