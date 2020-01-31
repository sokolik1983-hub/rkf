import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "components/Paginator";
import { formatText } from "utils";
import { Request } from "utils/request";
import { endpointGetClubs } from "../../config";
import { DEFAULT_IMG } from "../../../../appConfig";
import { connectFilters } from "../../connectors";
import ListItem from "./ListItem";
import Placeholder from "./Placeholder";
import "./index.scss";


const ClubsList = ({ string_filter, federation_ids, club_ids, is_activated, page, setFilters }) => {
    const [clubs, setClubs] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [loading, setLoading] = useState(true);

    const getClubs = async () => {
        setLoading(true);
        await Request({
            url: endpointGetClubs,
            method: 'POST',
            data: JSON.stringify({
                string_filter,
                federation_ids,
                club_ids,
                is_activated,
                page
            })
        }, data => {
            setClubs(data.clubs);
            setPagesCount(Math.ceil(data.clubs_count / 10));
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
        setLoading(false);
    };

    useEffect(() => {
        (() => getClubs())();
    }, [string_filter, federation_ids, club_ids, is_activated, page]);

    return loading
        ? <Placeholder />
        : <div className="clubs-page__list list">
            {
                !clubs || !clubs.length
                    ? <h2 className="list__title">Клубы не найдены</h2>
                    : <>
                        <ul className="list__content">
                            {clubs.map(item => (
                                <li className="list__item" key={item.club_id}>
                                    <ListItem
                                        id={item.club_id}
                                        content={item.content}
                                        city={item.legal_city_name}
                                        url={item.url}
                                        club_name={item.title}
                                        club_alias={item.alias}
                                        club_logo={item.picture_link}
                                        club_owner={item.owner_name}
                                        federation_name={item.federation_name}
                                        federation_link={item.federation_alias}
                                        is_active={item.is_active}
                                    />
                                    
                                    {/* <Card className="club">
                                        <div className="club__wrap-head">
                                            <div className="club__head">
                                                <Link to={`/${club.alias}`}>
                                                    <div className="club__avatar"
                                                        style={{ backgroundImage: `url(${club.picture_link ? club.picture_link : DEFAULT_IMG.clubAvatar})` }}
                                                    />
                                                </Link>
                                                <div className="club__about">
                                                    <Link to={`/${club.alias}`}>
                                                        <h5 className="club__name">{club.title || 'У клуба нет названия'}</h5>
                                                    </Link>
                                                    {
                                                        club.federation_alias
                                                            ? <Link to={`/${club.federation_alias}`} className="club__federation">{club.federation_name}</Link>
                                                            : <p className="club__federation">{club.federation_name}</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                        <div className="club__info">
                                            {club.legal_city_name && <p><span>Город: </span>{club.legal_city_name}</p>}
                                            {club.is_active && club.owner_name &&
                                                <p><span>{`${club.owner_position || 'Руководитель'}: `}</span>{club.owner_name}</p>
                                            }
                                        </div>
                                        {!club.is_active ?
                                            <h4 className="club__description">Клуб ещё не прошёл регистрацию в электронной системе РКФ</h4> :
                                            club.content ? <p className="club__description _active" dangerouslySetInnerHTML={{ __html: formatText(club.content) }} /> :
                                                null
                                        }
                                        {club.is_active &&
                                            <div className="club__more">
                                                <Link to={`/${club.alias}`}>Подробнее</Link>
                                            </div>
                                        }
                                    </Card> */}
                                </li>
                            ))}
                        </ul>
                        {pagesCount > 1 &&
                            <Paginator
                                pagesCount={pagesCount}
                                currentPage={page}
                                setPage={page => setFilters({ page })}
                            />
                        }
                    </>
            }
        </div>
};

export default connectFilters(React.memo(ClubsList));