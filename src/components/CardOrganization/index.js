import React from "react";
import { Link } from "react-router-dom";

import Card from "../Card";
import { ActiveUserMark, FederationChoiceMark } from "../Marks";
import { DEFAULT_IMG } from "../../appConfig";
import CardFooter from '../CardFooter';

import "./index.scss";


const CardOrganization = ({
                              id,
                              alias,
                              logo,
                              name,
                              user_type,
                              active_member,
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
                              setFilters
                          }) => {
    const url = user_type === 4 ? `/kennel/${ alias }` : user_type === 7 ? null :
        (user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online') ? `/club/${ alias }` : `/${ alias }/`;

    return (
        <Card className="card-organization">
            <div className="card-organization__content">
                <div className="card-organization__header">
                    { url ?
                        <div className="card-organization__author">

                            <Link
                                to={ url }
                                className={ `card-organization__logo ${ user_type === 3 || user_type === 4 ? `item-card__logo--club` : `` }` }
                                style={ {
                                    backgroundImage: `url(${ logo || DEFAULT_IMG.clubAvatar })`
                                } }
                            />

                            <div className="card-organization__container">
                                <div className="card-organization__name-wrap">
                                    <div>
                                        <div className="card-organization__name-inner">

                                            <Link to={ url } className="card-organization__name"
                                                  title={ name || 'Название отсутствует' }>
                                                { (user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                                    <>
                                                        <span>
                                                            { user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : user_type === 7 ? 'НКП' : '' }
                                                        </span>
                                                            &nbsp;
                                                    </>
                                                }

                                                <span>{ name || 'Название отсутствует' }</span>
                                            </Link>

                                            <span className="card-organization__mark">
                                                { active_rkf_user &&
                                                    <ActiveUserMark/>
                                                }

                                                { active_member &&
                                                <FederationChoiceMark/>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    { (user_type !== 0 && user_type !== 5 && user_type !== 7) &&
                                        <div className="card-organization__info-item">
                                            <span>
                                                { federation_name && federation_alias ?
                                                    <Link to={ `/${ federation_alias }` }>{ federation_name }</Link> : 'Федерация не указана'
                                                }
                                            </span>

                                            { city_name &&
                                                <span className="card-organization__city" title={ city_name }
                                                      onClick={ () => setFilters ? setFilters({ city_ids: [city_id] }) : null }>
                                                    { city_name }
                                                </span>
                                            }
                                        </div>
                                    }
                                </div>

                                <div className={ (user_type === 3 || user_type === 4) && 'card-organization__special-position'}>
                                    <div className="card-organization__info">
                                        <div className="card-organization__info-item">
                                            <span className="card-organization__subtitle">{ owner_position || 'Контактное лицо' }</span>&nbsp;

                                            <span>
                                                { owner_name ?
                                                    url ?
                                                        <Link to={ url }>{ owner_name }</Link> :
                                                        owner_name :
                                                    'Не указано'
                                                }
                                            </span>
                                        </div>

                                        { user_type !== 0 && user_type !== 5 && phones && !!phones.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Телефон</span>&nbsp;

                                                <span>{ phones.join(`, `) }</span>
                                            </div>
                                        }

                                        { user_type !== 0 && user_type !== 5 && mails && !!mails.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">E-mail</span>&nbsp;

                                                <span>{ mails.join(`, `) }</span>
                                            </div>
                                        }

                                        { user_type === 7 && site &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Сайт</span>&nbsp;

                                                <a href={ site.includes('http') ? site : `http://${ site }` }
                                                   target="_blank" rel="noopener noreferrer">{ site }</a>
                                            </div>
                                        }

                                        { user_type === 4 && breeds && !!breeds.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Породы</span>&nbsp;

                                                <span>{ breeds.slice(0, 4).join(`, `) }</span>
                                            </div>
                                        }
                                    </div>

                                    <div className="card-organization__text">
                                        { content }
                                    </div>
                                </div>
                            </div>
                        </div> :

                        <div className="card-organization__author card-organization__no-url">
                            <span className="card-organization__logo" style={ {
                                backgroundImage: `url(${ logo || DEFAULT_IMG.clubAvatar })`
                            } }/>

                            <div className="card-organization__container">
                                <div className="card-organization__heading">
                                    <span className="card-organization__name" title={ name || 'Название отсутствует' }>
                                        { (user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                            <>
                                                <span>
                                                    { user_type === 3
                                                        ? 'Клуб'
                                                        : user_type === 4
                                                            ? 'Питомник' : user_type === 5
                                                                ? 'Федерация' : user_type === 7
                                                                    ? 'НКП' : ''
                                                    }
                                                </span>
                                                &nbsp;
                                            </>
                                        }

                                        <span>{ name || 'Название отсутствует' }</span>
                                    </span>

                                    <div className="card-organization__icons">
                                        { active_rkf_user &&
                                            <ActiveUserMark/>
                                        }

                                        { active_member &&
                                            <FederationChoiceMark/>
                                        }
                                    </div>
                                </div>

                                <div className={ (user_type === 3 || user_type === 4) && 'card-organization__special-position'}>
                                    <div className="card-organization__info">
                                        <div className="card-organization__info-item">
                                            <span className="card-organization__subtitle">{ owner_position || 'Контактное лицо' }</span>&nbsp;

                                            <span>
                                                { owner_name ?
                                                    url ?
                                                        <Link to={ url }>{ owner_name }</Link> :
                                                        owner_name :
                                                    'Не указано'
                                                }
                                            </span>
                                        </div>

                                        { user_type !== 0 && user_type !== 5 && phones && !!phones.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Телефон</span>&nbsp;

                                                <span>{ phones.join(`, `) }</span>
                                            </div>
                                        }

                                        { user_type !== 0 && user_type !== 5 && mails && !!mails.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">E-mail</span>&nbsp;

                                                <span>{ mails.join(`, `) }</span>
                                            </div>
                                        }

                                        { user_type === 7 && site &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Сайт</span>&nbsp;

                                                <a href={ site.includes('http') ? site : `http://${ site }` } target="_blank"
                                                   rel="noopener noreferrer">{ site }</a>
                                            </div>
                                        }

                                        { user_type === 4 && breeds && !!breeds.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Породы</span>&nbsp;

                                                <span>{ breeds.slice(0, 4).join(`, `) }</span>
                                            </div>
                                        }
                                    </div>

                                    <div className="card-organization__text">
                                        { content }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="card-organization__controls">
                <CardFooter
                    id={ id }
                    share_link={ `https://rkf.online${ url }` }
                />
            </div>
        </Card>
    )
};

export default React.memo(CardOrganization);