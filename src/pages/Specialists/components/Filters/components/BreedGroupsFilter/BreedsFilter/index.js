import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "components/Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "components/Card";

import "./index.scss";

const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`breeds-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const BreedsFilter = ({ breeds, breed_ids, onChange, needOpen }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(values.length > 0);

    useEffect(() => {
        if (breeds?.length) {
            setOptionsNotInValues(breeds.filter(option => breed_ids.indexOf(option.value) === -1));
            setValues(breeds.filter(option => breed_ids.indexOf(option.value) !== -1));
        }
        setIsOpen(needOpen || values.length > 0);

    }, [breeds, breed_ids, needOpen, values.length]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = cityId => {
        onChange(values.filter(city => city.value !== cityId).map(city => city.value));
    };

    return (
        <Card className="breeds-filter-regions">
            <div className="breeds-filter-regions__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breeds-filter-regions__title">Породы</h5>
                <span className={`breeds-filter-regions__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters-regions"
            >
                <div className="breeds-filter__wrap-regions">
                    <Select
                        id="breeds-filter-regions"
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
                        classNamePrefix="breeds-filter-regions"
                        placeholder="Начните вводить породу"
                        noOptionsMessage={() => 'Порода не найдена'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                    <ul className="breeds-filter-regions__values">
                            {values.map(item =>
                                <li className="breeds-filter-regions__values-item" key={item.value}>
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

export default React.memo(BreedsFilter);