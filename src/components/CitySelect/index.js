import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { CITY_SELECTOR_STYLE } from './config';
import { useDictionary } from 'apps/Dictionaries';
import { DICTIONARIES } from 'apps/Dictionaries/config';
import Dropdown from 'components/Dropdown';
import {storeExhibitions} from 'apps/HomePage/actions';
import {useResourceAndStoreToRedux} from 'shared/hooks';
import {
    DEFAULT_ELEMENTS_COUNT_OFFSET,
    FEATURED_EXHIBITIONS_ENDPOINT
} from 'apps/HomePage/config';
import './styles.scss';

const LS_KEY = 'GLOBAL_CITY';
const noOptionsMessage = () => 'Город не найден';
const selectorInitialState = { label: 'Выбор города', value: null };
const storeFilters = city => {
    let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    filters.cities = city ? [city.value] : [];
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
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

function CitySelect() {
    const ddRef = useRef();
    const [city, setCity] = useState(loadCity());

    const { dictionary } = useDictionary(DICTIONARIES.cities);

    const closeSelector = () => {
        // TODO сделано "быстро", надо сделать хорошо
        ddRef.current.props.onOutsideClick();
    };

    const onChange = value => {
        if (!value.value || value.value === 'reset') {
            setCity(selectorInitialState);
            localStorage.removeItem(LS_KEY);
            storeFilters();
            closeSelector();
            return;
        }

        storeCity(value);
        closeSelector();
        setCity(value);
    };

    const selectOptions = [
        { value: 'reset', label: 'Все города' },
        ...dictionary.options
    ];

    //отправляем запрос и пишим в Redux предстоящие выставки в зависимости от города
    //TODO: нужно убрать это отсюда, т.к. этот запрос происходит на каждой странице, а должен на главной
    const url = `${FEATURED_EXHIBITIONS_ENDPOINT}?ElementsCount=${DEFAULT_ELEMENTS_COUNT_OFFSET}${city && city.value ? '&CityId=' + city.value : ''}`;
    useResourceAndStoreToRedux(url, storeExhibitions);

    return (
        <Dropdown
            ref={ddRef}
            innerComponent={city.label}
            className="CitySelect"
            withClear={!!city.value}
            clearLabel={() => onChange(selectorInitialState)}
        >
            <h3 className="CitySelect__heading">Выберите ваш город:</h3>
            <Select
                closeMenuOnSelect={false}
                styles={CITY_SELECTOR_STYLE}
                options={selectOptions}
                defaultMenuIsOpen={true}
                hideSelectedOptions={false}
                menuIsOpen={true}
                controlShouldRenderValue={false}
                clearable={true}
                placeholder={'Начните вводить город'}
                noOptionsMessage={noOptionsMessage}
                isSearchable
                value={city}
                onChange={onChange}
            />
        </Dropdown>
    );
}

export default CitySelect;
