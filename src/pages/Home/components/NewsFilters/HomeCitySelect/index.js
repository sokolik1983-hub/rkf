import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import Loading from "../../../../../components/Loading";
import useIsMobile from "../../../../../utils/useIsMobile";
import {Request} from "../../../../../utils/request";
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

const CitySelect = ({changeCityFilter, checkedCities}) => {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const isMobile = useIsMobile(700);

    useEffect(() => {
        (() => Request({url: '/api/city'},
        data => {
            if(data) {
                setOptions(data.map(city => ({value: city.id, label: city.name}))); //переделать на бэке, чтобы приходили не все города и в формате {value, label}
                setLoading(false);
            }
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    const setLSFilters = cities => {
        let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
        filters.cities = cities ? cities : [];
        localStorage.setItem('FiltersValues', JSON.stringify(filters));
    };

    const handleChange = values => {
        console.log('values', values);
        if (!values.length || values.find(item => item.value === 'reset')) {
            changeCityFilter([]);
            setLSFilters([]);
        } else {
            const ids = values.map(value => value.value);
            changeCityFilter(ids);
            setLSFilters(ids);
        }
    };

    console.log('checkedCities', checkedCities)

    return (
        <>
            <h5 className="cities-filter__title" style={{borderBottom: "1px solid #e8e8e8"}}>
                Города
            </h5>
            <div className="cities-filter__wrap">
                {loading && <Loading centered={false}/>}
                {!loading && !isMobile &&
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
                            ...options.filter(option => checkedCities.indexOf(option.value) !== -1),
                            ...options.filter(option => checkedCities.indexOf(option.value) === -1)
                        ]}
                        value={options.filter(option => checkedCities.indexOf(option.value) !== -1)}
                        onChange={handleChange}
                        components={{Option}}
                        maxMenuHeight={170}
                    />
                }
            </div>
        </>
    );
}

export default CitySelect;
