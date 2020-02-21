import React from 'react';
import CustomCheckbox from "components/Form/CustomCheckbox";
import { connectFilters } from "pages/Exhibitions/connectors";
import "./index.scss";


const RanksFilter = ({ setFiltersSuccess, RankIds, ranks }) => {
    const handleChange = id => {
        const ranksIds = RankIds.includes(id) ?
            RankIds.filter(item => item !== id) :
            [...RankIds, id];

        setFiltersSuccess({ CityIds: [], RankIds: ranksIds, PageNumber: 1 });
    };

    return <div className="ranks-filter">
        <h5 className="ranks-filter__title">Ранг выставки</h5>
        {ranks && !!ranks.length &&
            <ul className="ranks-filter__list">
                {ranks.map(item => (
                    <li className="ranks-filter__item" key={item.id}>
                        <CustomCheckbox
                            id={item.id}
                            label={item.name}
                            checked={RankIds && RankIds.includes(item.id)}
                            onChange={() => handleChange(item.id)}
                        />
                    </li>
                ))}
            </ul>
        }
    </div>
};

export default connectFilters(React.memo(RanksFilter));