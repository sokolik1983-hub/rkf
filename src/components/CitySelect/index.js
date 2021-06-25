import React, { useState, useRef, useEffect } from 'react';
import Select,{ components} from 'react-select';
import { CITY_SELECTOR_STYLE } from './config';
import { useDictionary } from "../../dictionaries";
import { DICTIONARIES } from "../../dictionaries/config";
import Dropdown from 'components/Dropdown';
import './styles.scss';
import CustomCheckbox from "../Form/CustomCheckbox";
import useIsMobile from "../../utils/useIsMobile";

const LS_KEY = 'GLOBAL_CITY';
const noOptionsMessage = () => 'ГОРОДОВ НЕ НАЙДЕНО';
const selectorInitialState = { label: 'Выберите город', value: null };
const storeFilters = city => {
    let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    filters.cities = city ? [city.value] : [];
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};

const Option = props => {
    // console.log(props.isSelected)
    return  (
        <components.Option {...props}>
            <CustomCheckbox
                id={`cities-${props.value}`}
                label={props.label}
                checked={props.isSelected}
                onChange={() => null}
            />
        </components.Option>
    )
};


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
    const isMobile = useIsMobile(700);
    const ddRef = useRef();
    const [city, setCity] = useState(loadCity());
    const [cities, setCities] = useState([]);
    const [values, setValues] = useState([]);
    const { dictionary } = useDictionary(DICTIONARIES.cities);

    const closeSelector = () => {
        // TODO сделано "быстро", надо сделать хорошо
        ddRef.current.props.onOutsideClick();
    };

    useEffect(() => {
        // setValues(cities.filter(option => cities.values.indexOf(option.value) !== -1));
console.log("cities", cities)
        currentCity && onChange(currentCity)
    }, [currentCity]);


    const onChange = value => {
        console.log('change value', value)
        console.log("cities", cities)
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
        //  cityFilter(value);
        // // // closeSelector();
        setCities([...cities, ...value]);
    };

    const selectOptions = [
        { value: 'reset', label: 'Все города' },
        ...dictionary.options
    ];


    const handleChange = options => {
        // debugger
        console.log("options", options)
        // setCities([...cities, ...value]);
        cityFilter(options.map(option => option.value));
    };
    return (

        <>
            <h5 className="cities-filter__title" style={{borderBottom: "1px solid #e8e8e8"
            }}>Города</h5>
            <div className="cities-filter__wrap"><div className="cities-filter__wrap"></div>
                {!isMobile &&
                <Select
                    id="cities-filter"
                    isMulti={true}
                    closeMenuOnSelect={false}
                    options={[...values, ...selectOptions]}
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
                    // value={cities}
                    components={{ Option }}
                    maxMenuHeight={170}
                />
                }
        </div>
    </>
    );
}

export default CitySelect;
