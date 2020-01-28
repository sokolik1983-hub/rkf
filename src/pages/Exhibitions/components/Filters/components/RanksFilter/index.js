import React, { useState, useEffect } from 'react';
import Loading from "components/Loading";
import CustomCheckbox from "components/Form/CustomCheckbox";
import {Request} from "utils/request";
import {endpointExhibitionsRanks} from "pages/Exhibitions/config";
import {connectFilters} from "pages/Exhibitions/connectors";
import "./index.scss";


const RanksFilter = ({setFiltersSuccess, RankIds}) => {
    const [ranks, setRanks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointExhibitionsRanks
        }, data => {
            setRanks(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    const handleChange = id => {
        const ranksIds = RankIds.includes(id) ?
            RankIds.filter(item => item !== id) :
            [...RankIds, id];

        setFiltersSuccess({CityIds: [], RankIds: ranksIds, PageNumber: 1});
    };

    return loading ?
        <Loading /> :
        <div className="ranks-filter">
            <h4 className="ranks-filter__title">Ранг выставки</h4>
            {ranks && !!ranks.length &&
                <ul className="ranks-filter__list">
                    {ranks.map(item => (
                        <li className="ranks-filter__item" key={item.id}>
                            <CustomCheckbox
                                id={item.id}
                                label={item.name}
                                checked={RankIds.includes(item.id)}
                                onChange={() => handleChange(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            }
        </div>
};

export default connectFilters(React.memo(RanksFilter));