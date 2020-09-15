import React, {useState, useEffect} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
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

const CitiesFilter = ({cities, city_ids, onChange, isExhibitions}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if(cities.length) {
            setOptionsNotInValues(cities.filter(option => city_ids.indexOf(option.value) === -1));
            setValues(cities.filter(option => city_ids.indexOf(option.value) !== -1));
        }
    }, [cities, city_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = cityId => {
        onChange(values.filter(city => city.value !== cityId).map(city => city.value));
    };

    return (
        <Card className="cities-filter">
            <h5 
                className="cities-filter__title"
                onClick={() => setIsOpen(!isOpen)}
            >
                Города
            </h5>
            <CSSTransition
                in={isOpen}
                timeout={350}
                classNames="dropdown__transition"
                unmountOnExit
            >
                <div className={isExhibitions ? `` : `_title_line`}>
                    <Select
                        id="cities-filter"
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
                        classNamePrefix="cities-filter"
                        placeholder="Начните вводить город"
                        noOptionsMessage={() => 'Город не найден'}
                        value={values}
                        components={{Option}}
                        maxMenuHeight={isExhibitions && 170}
                    />
                    {!!values.length &&
                        <ul className="cities-filter__values">
                            {values.map(item =>
                                <li className="cities-filter__values-item" key={item.value}>
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