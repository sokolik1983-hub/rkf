import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import Share from "../Share";
import { ActiveUserMark, FederationChoiceMark } from "../Marks";
import LightTooltip from "components/LightTooltip";
import { DEFAULT_IMG } from "../../appConfig";
import { formatText } from "../../utils";
import "./index.scss";


const CardExhibition = ({ title,
    city,
    city_id,
    club_name,
    club_alias,
    club_logo,
    date,
    photo,
    url,
    ranks,
    federation_name,
    federation_link,
    user,
    active_rkf_user,
    active_member,
    setFilters,
    reports }) => (
        <Card className="card-exhibition">
            <div className="card-exhibition__wrap">
                <Link className="card-exhibition__photo" to={url} style={{ backgroundImage: `url(${photo || DEFAULT_IMG.exhibitionPicture})` }} />
                <div className="card-exhibition__content">
                    <div className="card-exhibition__header">
                        <div>
                            <Link className="card-exhibition__title" to={url} title={title}>{formatText(title)}</Link>
                        </div>
                        <div className="card-exhibition__header-info _mobile">
                            <span
                                className="card-exhibition__city"
                                onClick={() => setFilters ? setFilters(city_id) : null}
                                title={city}
                            >{city}</span>
                            <span className="card-exhibition__date">{date}</span>
                            <span className="card-exhibition__rank">{ranks}</span>
                        </div>
                        <span
                            className="card-exhibition__city"
                            onClick={() => setFilters ? setFilters(city_id) : null}
                            title={city}
                        >{city}</span>
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
                            {active_rkf_user &&
                                <ActiveUserMark />
                            }
                            {active_member &&
                                <FederationChoiceMark />
                            }
                        </Link>
                        {federation_name && federation_link ?
                            <Link to={federation_link} className="card-exhibition__federation">{federation_name}</Link> :
                            <p className="card-exhibition__federation">Федерация не указана</p>
                        }
                    </div>
                    {reports && reports.length > 0 &&
                        <div className="card-exhibition__reports">
                            <span>Отчет</span>
                            <div className="card-exhibition__reports_block">
                                {reports.map((rep, index) =>
                                    <div className="card-exhibition__reports_link" key={index}>
                                        <a target="_blank" rel="noopener noreferrer" href={rep.link} title={rep.report_type_name} />
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    <div className="card-exhibition__info">
                        <div>
                            <span className="card-exhibition__subtitle">Дата проведения</span>
                            <p>{date}</p>
                        </div>
                        <div>
                            <span className="card-exhibition__subtitle">Федерация</span>
                            <p>{federation_name && federation_link ? <Link to={federation_link}>{federation_name}</Link> : 'Федерация не указана'}</p>
                        </div>
                        <div className="card-exhibition__rank">
                            <span className="card-exhibition__subtitle">Ранг</span>
                            <LightTooltip title={ranks} enterDelay={200} leaveDelay={200}>
                                <p>{ranks}</p>
                            </LightTooltip>
                        </div>
                        {reports && reports.length > 0 &&
                            <div>
                                <span className="card-exhibition__subtitle">Отчет</span>
                                <div className="card-exhibition__subtitle_link">
                                    {reports.map((rep, index) =>
                                        <a target="_blank" rel="noopener noreferrer" key={index} href={rep.link} title={rep.report_type_name} />
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="card-exhibition__controls">
                <Link className="card-exhibition__show-all" to={url}>Подробнее...</Link>
                <Share url={`https://rkf.online${url}`} />
            </div>
        </Card>
    );

export default React.memo(CardExhibition);