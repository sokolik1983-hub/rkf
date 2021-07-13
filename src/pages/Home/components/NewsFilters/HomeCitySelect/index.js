import React, {useEffect} from 'react';
import Select, { components } from 'react-select';
import { useDictionary } from "../../../../../dictionaries";
import { DICTIONARIES } from "../../../../../dictionaries/config";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import useIsMobile from "../../../../../utils/useIsMobile";

import './styles.scss';

const LS_KEY = 'GLOBAL_CITY';

const Option = props => {
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

const HomeCitySelect = ({changeCityFilter, checkedCities, startElement}) => {
    const isMobile = useIsMobile(700);

    const {dictionary} = useDictionary(DICTIONARIES.cities);

    const selectOptions = [
        {value: 'reset', label: 'Все города'},
        ...dictionary.options
    ];

    
    useEffect(() => {
        console.log(checkedCities)
    }, [checkedCities])
    
    const setLSFilters = cities => {
        let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
        filters.cities = cities ? cities : [];
        localStorage.setItem('FiltersValues', JSON.stringify(filters));
    };

    function handleChange(value){
        // console.log(value)
        // задать фильтр по умолчанию { label: 'Выберите город', value: null }
        // localStorage.removeItem(LS_KEY);
        // if(value.length === 0) {
        //     return console.log('false')
        // }
        //
        // else {
        //     //записать в localstorage
        //     changeCityFilter(Object.assign(checkedCities, value))
        //     setLSFilters(checkedCities)
        // }


        if (!value.length || value.value === 'reset') {
            //задать фильтр по умолчанию { label: 'Выберите город', value: null }
            // localStorage.removeItem(LS_KEY);
            // console.log("!value.length")
        } else {
            // console.log(" yes value.length")
            //записать в localstorage
            changeCityFilter(Object.assign(checkedCities, value))
            setLSFilters(checkedCities)
        }
    };

    return (
        <>
            <h5 className="cities-filter__title" style={{borderBottom: "1px solid #e8e8e8"}}>
                Города
            </h5>
            <div className="cities-filter__wrap">
                {!isMobile &&
                <Select
                    id="cities-filter"
                    classNamePrefix="cities-filter"
                    placeholder="Начните вводить город"
                    noOptionsMessage={() => 'Город не найден'}
                    isMulti
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                    defaultMenuIsOpen={true}
                    menuIsOpen={true}
                    controlShouldRenderValue={true}
                    clearable
                    isSearchable
                    options={selectOptions}
                    value={checkedCities}
                    onChange={handleChange}
                    components={{ Option }}
                    maxMenuHeight={170}
                />

                }

            </div>
        </>
    );
}

export default HomeCitySelect;
