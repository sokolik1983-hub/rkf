import React, {useEffect} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import "./styles.scss";

const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`cities-${props.value - 1}`}
            label={props.label}
            checked={props.isSelected}
            onChange={e => {
                e.preventDefault();
                e.stopPropagation();
                return null;
            }}
        />
    </components.Option>
);

const CitySelect = ({changeCityFilter, checkedCities, cities}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (values, {option}) => {
        if (!values.length || option.value === 'reset') {
            changeCityFilter([]);
        } else {
            changeCityFilter(values.filter(value => value.value !== 'reset').map(value => value.value));
        }
    };

    return (
        <div className="cities-filter">
            <h5 className="cities-filter__title">Города</h5>
            <div className="cities-filter__content">
                <Select
                    id="cities-filter"
                    classNamePrefix="cities-filter"
                    placeholder="Начните вводить город"
                    noOptionsMessage={() => 'Город не найден'}
                    isMulti
                    closeMenuOnSelect={false}
                    defaultMenuIsOpen={true}
                    hideSelectedOptions={false}
                    menuIsOpen={true}
                    controlShouldRenderValue={false}
                    clearable
                    isSearchable
                    options={[
                        {value: 'reset', label: 'Все города'},
                        ...cities.filter(option => checkedCities.indexOf(option.value) !== -1),
                        ...cities.filter(option => checkedCities.indexOf(option.value) === -1)
                    ]}
                    value={checkedCities.length ?
                        cities.filter(option => checkedCities.indexOf(option.value) !== -1) :
                        {value: 'reset', label: 'Все города'}
                    }
                    onChange={handleChange}
                    components={{Option}}
                    maxMenuHeight={170}
                />
            </div>
        </div>
    );
}

export default CitySelect;
