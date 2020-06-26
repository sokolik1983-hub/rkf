import React, {useState, useEffect} from 'react';
import Select, {components} from 'react-select';
import Loading from "../../../../../../components/Loading";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {Request} from "../../../../../../utils/request";
import {endpointGetCities} from "../../../../config";
import {connectFilters} from "../../../../connectors";
import './index.scss';


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={props.value}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const CitiesFilter = ({city_ids, setFilters}) => {
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        (() => Request({
            url: endpointGetCities
        }, data => {
            setCities(data);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            if(error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    useEffect(() => {
        if(cities.length) {
            setOptionsNotInValues(cities.filter(option => city_ids.indexOf(option.value) === -1));
            setValues(cities.filter(option => city_ids.indexOf(option.value) !== -1));
        }
    }, [cities, city_ids]);

    const handleChange = options => {
        setFilters({city_ids: options.map(option => option.value), page: 1});
    };

    return loading ?
        <Loading/> :
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
};

export default connectFilters(React.memo(CitiesFilter));