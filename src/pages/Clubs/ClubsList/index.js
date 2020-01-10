import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../../components/Loading";
import Card from "../../../components/Card";
import Paginator from "../../../components/Paginator";
import {formatText} from "../../../utils";
import {Request} from "../../../utils/request";
import {endpointGetClubs} from "../config";
import {DEFAULT_IMG} from "../../../appConfig";
import {connectFilters} from "../connectors";
import "./index.scss";


const ClubsList = ({string_filter, federation_ids, club_ids, page, setFilters}) => {
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
    }, [string_filter, federation_ids, club_ids, page]);

    return loading ?
        <Loading /> :
        <div className="clubs-page__list list">
            {!clubs || !clubs.length ?
                <h2 className="list__title">Клубы не найдены</h2> :
                <>
                    <ul className="list__content">
                    {clubs.map(club => (
                        <li className="list__item" key={club.club_id}>
                            <Card className="club">
                                <div className="club__wrap-head">
                                    <Link to={`/${club.alias}`} className="club__head">
                                        <div className="club__avatar"
                                             style={{backgroundImage: `url(${club.picture_link ? club.picture_link : DEFAULT_IMG.clubAvatar})`}}
                                        />
                                        <div className="club__about">
                                            <h5 className="club__name">{club.title || 'У клуба нет названия'}</h5>
                                            {club.federation_name && <p className="club__federation">{club.federation_name}</p>}
                                        </div>
                                    </Link>
                                </div>
                                <div className="club__info">
                                    {club.legal_city_name && <p><span>Город: </span>{club.legal_city_name}</p>}
                                    {club.is_active && club.owner_name &&
                                        <p><span>{`${club.owner_position || 'Руководитель'}: `}</span>{club.owner_name}</p>
                                    }
                                </div>
                                {!club.is_active ?
                                    <h4 className="club__description">Клуб ещё не прошёл регистрацию в электронной системе РКФ</h4> :
                                    club.content ? <p className="club__description _active" dangerouslySetInnerHTML={{__html: formatText(club.content)}} /> :
                                    null
                                }
                                {club.is_active &&
                                    <div className="club__more">
                                        <Link to={`/${club.alias}`}>Подробнее</Link>
                                    </div>
                                }
                            </Card>
                        </li>
                    ))}
                </ul>
                    {pagesCount > 1 &&
                        <Card className="list__pagination">
                            <Paginator
                                pagesCount={pagesCount}
                                currentPage={page}
                                setPage={page => setFilters({page})}
                            />
                        </Card>
                    }
                </>
            }
        </div>
};

export default connectFilters(React.memo(ClubsList));