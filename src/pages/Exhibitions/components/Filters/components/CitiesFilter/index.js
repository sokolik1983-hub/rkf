import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../../utils";
import {customStyles} from "../../config.js";
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

const CitiesFilter = ({cities, CityIds}) => {
    const [values, setValues] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if(cities.length) {
            const optionValues = cities.filter(option => CityIds.indexOf(option.value) !== -1);
            const optionsNotInValues = cities.filter(option => CityIds.indexOf(option.value) === -1);

            setValues([...optionValues]);
            setOptions([...optionValues, ...optionsNotInValues]);
        }
    }, [cities, CityIds]);

    const handleChange = options => {
        setFiltersToUrl({CityIds: options.map(option => option.value)});
    };

    const handleDelete = cityId => {
        setFiltersToUrl({CityIds: values.filter(city => city.value !== cityId).map(city => city.value)});
    };

    return (
        <div className="cities-filter">
            <h5 className="cities-filter__title">Города</h5>
            <Select
                id="cities-filter"
                isMulti={true}
                closeMenuOnSelect={false}
                options={options}
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
                styles={customStyles}
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
    )
};

export default React.memo(CitiesFilter);