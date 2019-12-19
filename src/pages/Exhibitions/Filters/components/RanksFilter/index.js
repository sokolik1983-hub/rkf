import React, { useState, useEffect } from 'react';
import Loading from "../../../../../components/Loading";
import { Request } from "../../../../../utils/request";
import { connectFilters } from "../../../connectors";
import './styles.scss';


const RanksFilter = ({ setFiltersSuccess, RankIds }) => {
    const [loading, setLoading] = useState(true);
    const [ranks, setRanks] = useState([]);
    const [active, setActive] = useState([]);

    useEffect(() => {
        Request({
            url: '/api/exhibitions/Rank'
        }, data => {
            if (data.length) setRanks(data.map(d => ({ ...d, active: false })));
            setLoading(false);
        },
            error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFiltersSuccess({ CityIds: [], RankIds: active, PageNumber: 1 });
    }, [active]);

    useEffect(() => {
        if (!RankIds.length && active.length) setActive([]);
    }, [RankIds]);

    const handleChange = ({ target }, id) => {
        setActive(target.checked ? active.concat(id) : active.filter(i => i !== id));
    };

    return loading ?
        <Loading /> :
        <div className="RanksFilter">
            <h4>Ранг выставки</h4>
            {
                ranks.map(r => {
                    return <label key={r.id} htmlFor={`rank-${r.id}`}>
                        <input
                            checked={active.find(i => i === r.id) ? true : false}
                            onChange={(e) => handleChange(e, r.id)}
                            type="checkbox"
                            id={`rank-${r.id}`}
                        />&nbsp;{r.name}
                    </label>
                })
            }
        </div>
};

export default connectFilters(React.memo(RanksFilter));