import React, { useState, useRef, useEffect } from 'react';
import Select,{ components} from 'react-select';
import { CITY_SELECTOR_STYLE } from './config';
import { useDictionary } from "../../dictionaries";
import { DICTIONARIES } from "../../dictionaries/config";
import Dropdown from 'components/Dropdown';
import './styles.scss';
import CustomCheckbox from "../Form/CustomCheckbox";

const LS_KEY = 'GLOBAL_CITY';
const noOptionsMessage = () => 'ГОРОДОВ НЕ НАЙДЕНО';
const selectorInitialState = { label: 'Выберите город', value: null };
const storeFilters = city => {
    let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    filters.cities = city ? [city.value] : [];
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};

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
const storeCity = city => {
    localStorage.setItem(LS_KEY, JSON.stringify(city));
    //записываем город в фильтры в LocalStorage
    storeFilters(city);
};
const loadCity = () => {
    const city = localStorage.getItem(LS_KEY);

    return city ? JSON.parse(city) : selectorInitialState;
};

function CitySelect({ cityFilter, currentCity }) {
    const ddRef = useRef();
    const [city, setCity] = useState(loadCity());
    const [citys, setCitys] = useState(loadCity());

    const { dictionary } = useDictionary(DICTIONARIES.cities);

    // const closeSelector = () => {
    //     // TODO сделано "быстро", надо сделать хорошо
    //     ddRef.current.props.onOutsideClick();
    // };

    useEffect(() => {
        currentCity && onChange(currentCity)
    }, [currentCity]);

    const onChange = value => {
        setCitys(value)
        console.log('change value', value)
        // if (!value.value || value.value === 'reset') {
        //     setCity(selectorInitialState);
        //     localStorage.removeItem(LS_KEY);
        //     storeFilters();
        //     cityFilter && value.value && cityFilter(null);
        //     // closeSelector();
        //     return;
        // }
        //
        // storeCity(value);
        cityFilter && cityFilter(citys);
        // // closeSelector();
        // setCity(value);
    };
console.log("citys", citys)
console.log("cityFilter", cityFilter)
    const selectOptions = [
        { value: 'reset', label: 'Все города' },
        ...dictionary.options
    ];

    return (
        <div className="cities-filter__wrap"><div className="cities-filter__wrap"></div>
        <Select
            id="cities-filter"
            isMulti={true}
            // closeMenuOnSelect={false}
            options={selectOptions}
            // defaultMenuIsOpen={true}
            // hideSelectedOptions={false}
            menuIsOpen={true}
            // controlShouldRenderValue={false}
            onChange={onChange}
            clearable={true}
            isSearchable
            classNamePrefix="cities-filter"
            placeholder="Начните вводить город"
            noOptionsMessage={() => 'Город не найден'}
            // value={values}
            components={{ Option }}
            maxMenuHeight={170}
        />
    </div>

    );
}

export default CitySelect;
