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
    const { filterOptionsCities, changeCitiesFilter, filter } = useContext(
        ExhibitionsFilterContext
    );
    const { cities: filteredCities } = filter;

    // убираем из всех значений фильтра выбранные
    const optionsNotInValues = filterOptionsCities.filter(
        option => filteredCities.indexOf(option.value) === -1
    );
    // выбираем выбранные :)
    const values = filterOptionsCities.filter(
        option => filteredCities.indexOf(option.value) !== -1
    );
    // добавялем выбранные в начало и объединяем с тем что получили выше
    const options = [...values, ...optionsNotInValues];

    const handleChange = options => changeCitiesFilter(getValues(options));

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
