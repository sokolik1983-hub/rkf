import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const RankFilter = ({ranks, rank_id, onChange}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card className="rank-filter">
            <div className="rank-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="rank-filter__title">Ранги</h5>
                <span className={`rank-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="rank-filter__wrap">
                    {ranks.length ?
                        <ul className="rank-filter__list">
                            {ranks.map(option =>
                                <li className="rank-filter__item" key={`rank-${option.value}`}>
                                    <CustomCheckbox
                                        id={`rank-${option.value}`}
                                        label={option.label}
                                        checked={rank_id === option.value}
                                        onChange={() => onChange(rank_id === option.value ? 0 : option.value)}
                                    />
                                </li>
                            )}
                        </ul> :
                        <p className="rank-filter__no-options">Рангов не найдено</p>
                    }
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(RankFilter);