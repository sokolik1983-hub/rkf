import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const RanksFilter = ({ranks, rank_ids, onChange}) => {
    const handleChange = id => {
        const ranksIds = rank_ids.includes(id) ?
            rank_ids.filter(item => item !== id) :
            [...rank_ids, id];

        onChange(ranksIds);
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
                                checked={rank_ids.includes(item.id)}
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