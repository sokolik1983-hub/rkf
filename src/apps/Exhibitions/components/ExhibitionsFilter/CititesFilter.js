import React, {useContext} from "react";
import Select from "react-select";
import {defaultReactSelectStyles} from "appConfig";
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context'
import {getValues} from 'shared/reactSelect'

function CitiesFilter(props) {
    const {
        city_ids, cities, changeCitiesFilter
    } = useContext(ExhibitionsFilterContext);

    const options = city_ids.map(cityId => ({label: cities.dictionary[String(cityId)], value: cityId}));
    const handleChange = options => changeCitiesFilter(getValues(options));
    return (
        <Select
            id={'cities_selector'}
            isMulti={true}
            closeMenuOnSelect={false}
            styles={defaultReactSelectStyles.defaultTheme}
            options={options}
            defaultMenuIsOpen={true}
            hideSelectedOptions={false}
            menuIsOpen={true}
            controlShouldRenderValue={false}
            onChange={handleChange}
            clearable={true}
            isSearchable
            classNamePrefix={"ExInput"}
        />
    )
}

export default CitiesFilter