import React, {useState, useEffect} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`cities-${props.value}`}
            label={props.label}
            checked={props.isSelected} //где-то здесь косяк
            onChange={() => null}
        />
    </components.Option>
);

const CitiesFilter = ({cities, city_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        console.log('values in', values.map(item => item.value).join(', '));
        if(cities.length) {
            console.log('opt in', cities.filter(option => city_ids.indexOf(option.value) !== -1).map(item => item.value).join(', '));
            setOptionsNotInValues(cities.filter(option => city_ids.indexOf(option.value) === -1));
            setValues(cities.filter(option => city_ids.indexOf(option.value) !== -1));
        }
    }, [cities, city_ids]);

    console.log('values out', values.map(item => item.value).join(', '));

    const handleChange = options => {
        console.log('change', options.map(option => option.value).join(', '));
        onChange(options.map(option => option.value));
    };

    return (
        <div className="cities-filter">
            <h5 className="cities-filter__title">Города</h5>
            <Select
                id={'cities-filter'}
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
                classNamePrefix={'cities-filter'}
                placeholder={'Начните вводить город'}
                noOptionsMessage={() => 'Город не найден'}
                value={values}
                components={{Option}}
            />
        </div>
    )
};

export default React.memo(CitiesFilter);