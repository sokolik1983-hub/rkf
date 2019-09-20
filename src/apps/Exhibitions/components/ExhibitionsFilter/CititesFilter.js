import React, { useContext } from 'react';
import Select, { components } from 'react-select';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import { getValues } from 'shared/reactSelect';
import { EXHIBITIONS_FILTER_STYLE } from 'apps/Exhibitions/config';

const Option = props => {
    return (
        <div>
            <components.Option {...props}>
                <span />
                {props.label}
            </components.Option>
        </div>
    );
};

function CitiesFilter() {
    const {
        filterOptionsCities,
        changeCitiesFilter,
        filter,
        globalCity
    } = useContext(ExhibitionsFilterContext);
    const { cities: filteredCities } = filter;

    // убираем из всех значений фильтра выбранные
    const optionsNotInValues = filterOptionsCities.filter(
        option => filteredCities.indexOf(option.value) === -1
    );
    // выбираем выбранные :)
    const values = filterOptionsCities.filter(
        option => filteredCities.indexOf(option.value) !== -1
    );
    const handleChange = options => changeCitiesFilter(getValues(options));
    // добавялем выбранные в начало и объединяем с тем что получили выше

    // проверяем вдруг глобального города нет в фитрах
    // грёбаный город
    const check = () => {
        if (globalCity) {
            // выбран в фильтре
            if (filteredCities.indexOf(globalCity.value) !== -1) {
                if (
                    // но нет в фильтрах
                    // мы не можем об этом узнать
                    filterOptionsCities.filter(
                        option => option.value === globalCity.value
                    ).length === 0
                ) {
                    return true;
                }
            }
            return false;
        }
    };
    // если есть проблема с глобальным городом, то добавляем его вначало
    if (check()) {
        values.unshift(globalCity);
    }

    const options = [...values, ...optionsNotInValues];

    return (
        <Select
            id={'cities_selector'}
            isMulti={true}
            closeMenuOnSelect={false}
            styles={EXHIBITIONS_FILTER_STYLE}
            options={options}
            defaultMenuIsOpen={true}
            hideSelectedOptions={false}
            menuIsOpen={true}
            controlShouldRenderValue={false}
            onChange={handleChange}
            clearable={true}
            isSearchable
            classNamePrefix={'ExInput'}
            placeholder={'Начните вводить город'}
            noOptionsMessage={() => 'Город не найден'}
            components={{ Option }}
            value={values}
        />
    );
}

export default CitiesFilter;
