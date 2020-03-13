import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../../utils";
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
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        if(cities.length) {
            setOptionsNotInValues(cities.filter(option => CityIds.indexOf(option.value) === -1));
            setValues(cities.filter(option => CityIds.indexOf(option.value) !== -1));
        }
    }, [cities, CityIds]);

    const handleChange = options => {
        setFiltersToUrl({CityIds: options.map(option => option.value), ExhibitionName: '', PageNumber: 1});
    };

    return (
        <div className="cities-filter">
            <h5 className="cities-filter__title">Города</h5>
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
            />
        </div>
    )
};

export default React.memo(CitiesFilter);