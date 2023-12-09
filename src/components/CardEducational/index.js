import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import Share from "../Share";
import { ActiveUserMark, FederationChoiceMark } from "../Marks";
import { DEFAULT_IMG } from "../../appConfig";
import { formatText } from "../../utils";
import "./index.scss";
import moment from "moment";
import "moment/locale/ru";
moment.locale('ru');


const CardEducational = ({ id,
    name,
    city_name,
    city_id,
    photo,
    url,
    active_rkf_user,
    active_member,
    setFilters,
    payment_form_type_name,
    type_name,
    organizer_name,
    organizer_logo,
    organizer_alias,
    date_begin,
    registration_show,
    setShowModal }) => (
    <Card className="card-educational">
        <div className="card-educational__wrap">
            <Link className="card-educational__photo" to={url} style={{ backgroundImage: `url(${photo || DEFAULT_IMG.exhibitionPicture})` }} />
            <div className="card-educational__content">
                <div className="card-educational__header">
                    <div>
                        <Link className="card-educational__title" to={url} title={name}>{name && formatText(name)}</Link>
                    </div>
                    <div className="card-educational__header-info _mobile">
                        {
                            city_id && <span
                                className="card-educational__city"
                                onClick={() => setFilters ? setFilters(city_id) : null}
                                title={city_name}
                            >{city_name}</span>
                        }
                        <span className="card-educational__date">{moment(date_begin).format('DD.MM.YYYY')}</span>
                        <span className="card-exhibition__rank">{type_name}</span>
                    </div>

                    {
                        city_id && <span
                            className="card-educational__city"
                            onClick={() => setFilters ? setFilters(city_id) : null}
                            title={city_name}
                        >{city_name}</span>
                    }

                </div>
                <div className="card-educational__author">
                    <span className="card-educational__subtitle">Организатор</span>
                    <div className="card-educational__author-inner">
                        <Link to={`/${organizer_alias}`}>
                            <div className="card-educational__club-logo" style={{
                                backgroundImage: `url(${organizer_logo ? organizer_logo : DEFAULT_IMG.clubAvatar})`
                            }} />
                            <p className="card-educational__club-name">
                                {/* {(user === 3 || user === 4 || user === 5) &&
                                <>
                                    <span>{user === 3 ? 'Клуб' : user === 4 ? 'Питомник' : user === 5 ? 'Федерация' : ''}</span>
                                    &nbsp;
                                </>
                            } */}
                                {organizer_name}
                            </p>
                            {active_rkf_user &&
                                <ActiveUserMark />
                            }
                            {active_member &&
                                <FederationChoiceMark />
                            }
                        </Link>
                        <div className="_mobile">Форма: <span>{payment_form_type_name}</span></div>
                    </div>
                </div>
                <div className="card-educational__info">
                    <div>
                        <span className="card-educational__subtitle">Дата проведения</span>
                        <p>{moment(date_begin).format('DD.MM.YYYY')}</p>
                    </div>
                    <div>
                        <span className="card-educational__subtitle">Формат</span>
                        <p>{type_name ? type_name : 'Не указана'}</p>
                    </div>
                    <div className="card-educational__rank">
                        <span className="card-educational__subtitle">Форма</span>
                        <p>{payment_form_type_name ? payment_form_type_name : 'Не указана'}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="card-educational__controls">
            <div>
                <Link className="card-educational__show-all" to={url}>Подробнее...</Link>
                {
                    registration_show && <>
                        <span className="card-educational__sign-up" onClick={() => setShowModal({ name: name, id: id })}>Записаться на мероприятие</span>
                        <span className="card-educational__sign-up _mobile" onClick={() => setShowModal({ name: name, id: id })} >Записаться</span>
                    </>
                }
            </div>
            <Share url={`https://rkf.online${url}`} />
        </div>
    </Card>
);

export default React.memo(CardEducational);