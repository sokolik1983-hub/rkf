import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import CardFooter from '../CardFooter';
import { ActiveUserMark, FederationChoiceMark } from "../Marks";
import LightTooltip from "components/LightTooltip";
import { DEFAULT_IMG } from "../../appConfig";
import { formatText } from "../../utils";

import "./index.scss";


const CardExhibition = ({
                            id,
                            title,
                            city,
                            city_id,
                            club_name,
                            club_alias,
                            club_logo,
                            date,
                            photo,
                            url,
                            ranks,
                            ranksFull,
                            federation_name,
                            federation_link,
                            user,
                            active_rkf_user,
                            active_member,
                            setFilters,
                            searchTypeId,
                            reports,
                            is_liked,
                            like_count,
                        }) => (
        <Card className="card-exhibition">
            <div className="card-exhibition__wrap">
                <Link className="card-exhibition__photo" to={url} style={{ backgroundImage: `url(${photo || DEFAULT_IMG.exhibitionPicture})` }} />
                <div className="card-exhibition__content">
                    <div className="card-exhibition__header">
                        <div>
                            <Link className="card-exhibition__title" to={url} title={title}>{title && formatText(title)}</Link>
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
                        <div className="card-exhibition__author-wrap">
                            <Link className="card-exhibition__club-logo" style={{
                                backgroundImage: `url(${club_logo ? club_logo : DEFAULT_IMG.clubAvatar})`
                            }} to={`/${club_alias}`} />
                            <div className="card-exhibition__club-name">
                                <div className="card-exhibition__club-name_link">
                                {(user === 3 || user === 4 || user === 5) &&
                                    <>
                                        <span>{user === 3 ? 'Клуб' : user === 4 ? 'Питомник' : user === 5 ? 'Федерация' : ''}</span>
                                    &nbsp;
                                </>
                                }
                                    <Link to={`/club/${club_alias}`}>{club_name}</Link>
                                </div>
                                <div className="card-exhibition__federation-wrap">
                                    {federation_name && federation_link ?

                                        <Link to={federation_link} className="card-exhibition__federation">{federation_name}</Link> :
                                        <p className="card-exhibition__federation">Федерация не указана</p>

                                    }
                                </div>
                            </div>
                            <div className="card-exhibition__club-marks">
                            {active_rkf_user &&
                                <ActiveUserMark />
                            }
                            {active_member &&
                                <FederationChoiceMark />
                            }
                            </div>
                        </div>
                    </div>

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
                            <LightTooltip title={ranksFull} enterDelay={200} leaveDelay={200}>
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

            <div className="card-exhibition__footer-links">
                <div className="card-exhibition__open-exhibition">
                    <Link to={url}>Подробнее...</Link>
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
            </div>
            <div className={`card-exhibition__controls`}>
                <CardFooter
                    id={id}
                    share_link={window.location.host === 'rkf.online' ? `https://rkf.online${url}` : `https://stage.uep24.ru${url}`}
                    is_liked={is_liked}
                    like_count={like_count}
                    likesOn={true}
                    type="exhibitions"
                />
            </div>
        </Card>
    );

export default React.memo(CardExhibition);