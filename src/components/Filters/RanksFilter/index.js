import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "../../Card";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`ranks-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const RanksFilter = ({ ranks, rank_ids, onChange, is_club_link }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(is_club_link && !ranks.length ? false : true);

    useEffect(() => {
        if (ranks.length) { 
            setOptionsNotInValues(ranks.filter(option => rank_ids.indexOf(option.value) === -1));
            setValues(ranks.filter(option => rank_ids.indexOf(option.value) !== -1));
        }
    }, [ranks, rank_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = rankId => {
        onChange(values.filter(rank => rank.value !== rankId).map(rank => rank.value));
    };

    return (
        <Card className="ranks-filter">
            <div className="ranks-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="ranks-filter__title">Ранги</h5>
                <span className={`ranks-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="ranks-filter__wrap">
                    <Select
                        id="ranks-filter"
                        isMulti={true}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues]}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={handleChange}
                        clearable={true}
                        isSearchable
                        classNamePrefix="ranks-filter"
                        placeholder="Начните вводить ранг"
                        noOptionsMessage={() => 'Ранг не найден'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="ranks-filter__values">
                            {values.map(item =>
                                <li className="ranks-filter__values-item" key={item.value}>
                                    <span>{item.label}</span>
                                    <button type="button" onClick={() => handleDelete(item.value)}>✕</button>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(RanksFilter);