import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "components/Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "components/Card";
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
        if (ranks?.length) {
            setOptionsNotInValues(ranks.filter(option => rank_ids.indexOf(option.value) === -1));
            setValues(ranks.filter(option => rank_ids.indexOf(option.value) !== -1));
        }
    }, [ranks, rank_ids]);

    function compare(a, b) {
        let comparison = 0;
        if (a.value > b.value) {
            comparison = 1;
        } else if (a.value < b.value) {
            comparison = -1;
        }
        return comparison;
    }

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
                        isMulti={false}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues].sort(compare)}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={({ value }) => onChange(value === rank_ids[0] ? [] : [value])}
                        clearable={true}
                        isSearchable={false}
                        classNamePrefix="ranks-filter"
                        placeholder="Начните вводить мероприятие"
                        noOptionsMessage={() => 'Мероприятие не найдено'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(RanksFilter);