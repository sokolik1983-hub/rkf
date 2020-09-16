import React, { useState } from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import Card from "../../Card";
import { CSSTransition } from "react-transition-group";
import "./index.scss";


const RanksFilter = ({ ranks, rank_ids, onChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = id => {
        const ranksIds = rank_ids.includes(id) ?
            rank_ids.filter(item => item !== id) :
            [...rank_ids, id];

        onChange(ranksIds);
    };

    return (
        <Card className="ranks-filter">
            <div className="ranks-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="ranks-filter__title">Ранг мероприятия</h5>
                <span className={`ranks-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={350}
                unmountOnExit
            >
                <>
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
                </>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(RanksFilter);