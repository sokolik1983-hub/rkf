import React, { useEffect, useState } from "react";
import Placeholder from "./Placeholder";
import ListItem from "./ListItem";
import Paginator from "../../../../components/Paginator";
import { Request } from "../../../../utils/request";
import { endpointGetClubs } from "../../config";
import { connectFilters } from "../../connectors";
import "./index.scss";


const ClubsList = ({ string_filter, federation_ids, city_ids, is_activated, active_member, page, setFilters }) => {
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
                city_ids,
                is_activated,
                active_member,
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
    }, [string_filter, federation_ids, city_ids, is_activated, active_member, page]);

    return loading ?
        <Placeholder /> :
        <div className="clubs-page__list list">
            {!clubs || !clubs.length ?
                <h2 className="list__title">Клубы не найдены</h2> :
                <>
                    <ul className="list__content">
                        {clubs.map(item => (
                            <li className="list__item" key={item.club_id}>
                                <ListItem
                                    content={item.content}
                                    city={item.legal_city_name}
                                    cityId={item.legal_city_id}
                                    url={item.url}
                                    club_name={item.short_name ? item.short_name : item.title}
                                    club_alias={item.alias}
                                    club_logo={item.picture_link}
                                    club_owner={item.owner_name}
                                    federation_name={item.federation_name}
                                    federation_link={item.federation_alias}
                                    is_active={item.is_active}
                                    is_active_member={item.active_member}
                                />
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