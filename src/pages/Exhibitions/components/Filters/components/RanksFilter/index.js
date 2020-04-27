import React from "react";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../../utils";
import "./index.scss";


const RanksFilter = ({ranks, RankIds}) => {
    const handleChange = id => {
        const ranksIds = RankIds.includes(id) ?
            RankIds.filter(item => item !== id) :
            [...RankIds, id];
        setFiltersToUrl({ ExhibitionName: '', CategoryId: 0, RankIds: ranksIds, PageNumber: 1 });
    };

    return (
        <div className="ranks-filter">
            <h5 className="ranks-filter__title">Ранг мероприятия</h5>
            {ranks && !!ranks.length &&
                <ul className="ranks-filter__list">
                    {ranks.map(item => (
                        <li className="ranks-filter__item" key={item.id}>
                            <CustomCheckbox
                                id={`ranks-${item.id}`}
                                label={item.name}
                                checked={RankIds && RankIds.includes(item.id)}
                                onChange={() => handleChange(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
};

export default React.memo(RanksFilter);