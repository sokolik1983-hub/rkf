import React, {useEffect, useState} from "react";
import Placeholder from "./Placeholder";
import ListItem from "./ListItem";
import Paginator from "../../../../components/Paginator";
import {Request} from "../../../../utils/request";
import {endpointGetNurseries} from "../../config";
import {connectFilters} from "../../connectors";
import "./index.scss";


const NurseriesList = ({ string_filter, federation_ids, city_ids, is_activated, active_member, page, setFilters }) => {
    const [nurseries, setNurseries] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [loading, setLoading] = useState(true);

    const getClubs = async () => {
        setLoading(true);
        await Request({
            url: endpointGetNurseries,
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
            setNurseries(data.nurseries);
            setPagesCount(Math.ceil(data.nurseries_count / 10));
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
        <div className="nurseries-page__list list">
            {!nurseries || !nurseries.length ?
                <h2 className="list__title">Питомники не найдены</h2> :
                <>
                    <ul className="list__content">
                        {nurseries.map(item => (
                            <li className="list__item" key={item.profile_id}>
                                <ListItem
                                    content={item.content}
                                    city={item.legal_city_name}
                                    cityId={item.legal_city_id}
                                    name={item.short_name ? item.short_name : item.title}
                                    alias={item.alias}
                                    logo={item.picture_link}
                                    owner={item.owner_name}
                                    federation_name={item.federation_name}
                                    federation_link={item.federation_alias}
                                    is_active={item.is_active}
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

export default connectFilters(React.memo(NurseriesList));