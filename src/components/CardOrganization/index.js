import React from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import {ActiveUserMark, FederationChoiceMark} from "../Marks";
import CardFooter from "../CardFooter";
import Avatar from "../Layouts/Avatar";
import "./index.scss";


const CardOrganization = (props) => {
    const {
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
        setFilters,
        is_liked,
        like_count,
    } = props;

    const url = alias ?
        user_type === 4 ? `/kennel/${ alias }` :
        user_type === 7 ? `/nbc/${ alias }` :
        (user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online') ? `/club/${ alias }` :
        `/${ alias }/` : null;

    return (
        <Card className={`card-organization${user_type === 7 ? ' nkp-layout' : ''}`}>
            <div className="card-organization__content">
                <div className="card-organization__header">
                    {url ?
                        <div className="card-organization__author">
                            <Link
                                to={url}
                                className={`card-organization__logo ${(user_type === 3 || user_type === 4 ) && 'item-card__logo--club'}`}
                            >
                                <Avatar
                                    card="nkp-card"
                                    data="organization"
                                    id={id}
                                    logo={logo}
                                    name={name}
                                    userType={user_type}
                                />
                            </Link>
                            <div className="card-organization__container">
                                <div className={`card-organization__name-wrap
                                    ${(user_type === 0 || user_type === 5 || user_type === 7) ? 
                                    ' card-organization__name-fed' 
                                    : ''}`}
                                >
                                    <div>
                                        <div className="card-organization__name-inner">
                                            {
                                                alias ?
                                                    <Link
                                                        to={ url }
                                                        className="card-organization__name"
                                                        title={ name || 'Название отсутствует' }
                                                    >
                                                        { (user_type === 3 ||
                                                                user_type === 4 ||
                                                                user_type === 5 ||
                                                                user_type === 7
                                                            ) &&
                                                            <>
                                                                <span>
                                                                    { user_type === 3 ? 'Клуб' :
                                                                        user_type === 4 ? 'Питомник' :
                                                                            user_type === 7 ? 'НКП' : '' }
                                                                </span>
                                                                &nbsp;
                                                            </>
                                                        }
                                                        <span>{ name || 'Название отсутствует' }</span>
                                                    </Link>
                                                    :
                                                    <>
                                                        <span>
                                                            {
                                                                user_type === 3 ? 'Клуб' :
                                                                user_type === 4 ? 'Питомник' :
                                                                user_type === 7 ? 'НКП' : ''
                                                            }
                                                        </span>
                                                        &nbsp;
                                                        <span>{ name || 'Название отсутствует' }</span>
                                                    </>
                                            }
                                            <span className="card-organization__mark">
                                                {active_rkf_user && <ActiveUserMark/>}
                                                {active_member && <FederationChoiceMark/>}
                                            </span>
                                        </div>
                                    </div>
                                    {user_type !== 7 &&
                                        <div className="card-organization__info-item">
                                            {user_type !== 0 && user_type !== 5 &&
                                                <span className="card-organization__federation">
                                                    {federation_name && federation_alias ?
                                                        <Link to={`/${federation_alias}`}>
                                                            {federation_name}
                                                        </Link>
                                                        :
                                                        "Федерация не указана"
                                                    }
                                                </span>
                                            }
                                            {city_name &&
                                                <span
                                                    className="card-organization__city"
                                                    title={ city_name }
                                                    onClick={ () => setFilters ? setFilters({ city_ids: [city_id] }) : null }
                                                >
                                                    { city_name }
                                                </span>
                                            }
                                        </div>
                                    }
                                </div>
                                <div
                                    className={ `card-organization__special-position_left${
                                        user_type === 0 ||
                                        user_type === 5 || 
                                        user_type === 7 
                                            ? 
                                            "__fed" 
                                            : 
                                            "" 
                                    }` }>
                                    <div className="card-organization__info">
                                        <div className="card-organization__info-item">
                                            <span className="card-organization__subtitle">{ owner_position || 'Контактное лицо ' }&nbsp;</span>
                                            <span>
                                                { owner_name || ' Не указано' }
                                            </span>
                                        </div>

                                        { user_type !== 0 && user_type !== 5 && phones && !!phones.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Телефон&nbsp;</span>
                                                <span>{ phones.join(`, `) }</span>
                                            </div>
                                        }
                                        { user_type !== 0 && user_type !== 5 && mails && !!mails.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">E-mail&nbsp;</span>
                                                <span>{ mails.join(`, `) }</span>
                                            </div>
                                        }
                                        { user_type === 7 && site &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Сайт&nbsp;</span>
                                                <a href={ site.includes('http')
                                                    ?
                                                    site
                                                    :
                                                    `http://${ site }`
                                                }
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                >
                                                    { site }
                                                </a>
                                            </div>
                                        }
                                        { user_type === 4 && breeds && !!breeds.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Породы&nbsp;</span>
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
                            <Avatar
                                card="nkp-card"
                                data="nkp"
                                id={id}
                                logo={logo}
                                name={name}
                            />
                            <div className="card-organization__container">
                                <div className="card-organization__heading">
                                    <span
                                        className="card-organization__name"
                                        title={ name || 'Название отсутствует' }
                                    >
                                        {(user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                            <span>
                                                {
                                                    user_type === 3 ? 'Клуб ' :
                                                    user_type === 4 ? 'Питомник ' :
                                                    user_type === 5 ? 'Федерация ' :
                                                    user_type === 7 ? 'НКП ' : ' '
                                                }
                                            </span>
                                        }
                                        <span>{ name || 'Название отсутствует' }</span>
                                    </span>
                                    <div className="card-organization__icons">
                                        {active_rkf_user && <ActiveUserMark/>}
                                        {active_member && <FederationChoiceMark/>}
                                    </div>
                                </div>
                                <div className={ `card-organization__special-position_left${ 
                                    user_type === 0 ||
                                    user_type === 5 ||
                                    user_type === 7 
                                        ? 
                                        `__fed` 
                                        : 
                                        `` }` }
                                >
                                    <div className="card-organization__info">
                                        <div className="card-organization__info-item">
                                            <span
                                                className="card-organization__subtitle"
                                            >
                                                { owner_position || 'Контактное лицо' }&nbsp;
                                            </span>
                                            <span>
                                                { owner_name || 'Не указано' }
                                            </span>
                                        </div>
                                        { user_type !== 0 && user_type !== 5 && phones && !!phones.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Телефон&nbsp;</span>
                                                <span>{ phones.join(`, `) }</span>
                                            </div>
                                        }
                                        { user_type !== 0 && user_type !== 5 && mails && !!mails.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">E-mail&nbsp;</span>
                                                <span>{ mails.join(`, `) }</span>
                                            </div>
                                        }
                                        { user_type === 7 && site &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Сайт&nbsp;</span>
                                                <a
                                                    href={ site.includes('http')
                                                    ?
                                                    site
                                                    :
                                                    `http://${ site }`
                                                    }
                                                   target="_blank"
                                                   rel="noopener noreferrer">{ site }
                                                </a>
                                            </div>
                                        }
                                        { user_type === 4 && breeds && !!breeds.length &&
                                            <div className="card-organization__info-item">
                                                <span className="card-organization__subtitle">Породы&nbsp;</span>
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
                    share_link={
                    window.location.host === 'rkf.online'
                        ?
                        `https://rkf.online${ url }`
                        :
                        `https://stage.uep24.ru${ url }`
                    }
                    is_liked={is_liked}
                    like_count={like_count}
                    likesOn={true}
                    type="organizations"
                    userType={user_type}
                />
            </div>
        </Card>
    )
};

export default React.memo(CardOrganization);