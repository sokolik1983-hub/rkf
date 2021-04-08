import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "components/Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "components/Card";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`types-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const SpecializationFilter = ({ types, type_ids, onChange, is_club_link }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(is_club_link && !types.length ? false : true);

    useEffect(() => {
        if (types.length) {
            setOptionsNotInValues(types.filter(option => type_ids.indexOf(option.value) === -1));
            setValues(types.filter(option => type_ids.indexOf(option.value) !== -1));
        }
    }, [types, type_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

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
        <Card className="types-filter">
            <div className="types-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="types-filter__title">Специализация</h5>
                <span className={`types-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="types-filter__wrap">
                    <Select
                        id="types-filter"
                        isMulti={true}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues].sort(compare)}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={handleChange}
                        clearable={true}
                        isSearchable={false}
                        classNamePrefix="types-filter"
                        placeholder="Начните вводить ранг"
                        noOptionsMessage={() => 'Ранг не найден'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(SpecializationFilter);