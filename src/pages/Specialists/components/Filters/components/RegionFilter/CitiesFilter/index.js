import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { CSSTransition } from "react-transition-group";
import CustomCheckbox from "../../../../../../../components/Form/CustomCheckbox";
import Card from "../../../../../../../components/Card";
import "./index.scss";

const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`cities-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const CitiesFilter = ({ cities, city_ids, onChange, needOpen }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(values.length > 0);

    useEffect(() => {
        if (cities?.length) {
            setOptionsNotInValues(cities.filter(option => city_ids.indexOf(option.value) === -1));
            setValues(cities.filter(option => city_ids.indexOf(option.value) !== -1));
        }
        setIsOpen(needOpen || values.length > 0);

    }, [cities, city_ids, needOpen, values.length]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = cityId => {
        onChange(values.filter(city => city.value !== cityId).map(city => city.value));
    };

    return (
        <Card className="cities-filter-regions">
                        <div className="cities-filter-regions__head" onClick={() => setIsOpen(!isOpen)}>
                            <h5 className="cities-filter-regions__title">Города</h5>
                            <span className={`cities-filter-regions__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
                        </div>
                        <CSSTransition
                            in={isOpen}
                            timeout={50}
                            unmountOnExit
                            classNames="dropdown__filters-regions"
                        >
                            <div className="cities-filter__wrap-regions">
                                <Select
                                    id="cities-filter-regions"
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
                        classNamePrefix="cities-filter-regions"
                        placeholder="Начните вводить город"
                        noOptionsMessage={() => 'Город не найден'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                    <ul className="cities-filter-regions__values">
                            {values.map(item =>
                                <li className="cities-filter-regions__values-item" key={item.value}>
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

export default React.memo(CitiesFilter);