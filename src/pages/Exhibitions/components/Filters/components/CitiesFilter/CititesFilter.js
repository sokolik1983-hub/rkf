import React, {useState, useEffect} from 'react';
import Select, {components} from 'react-select';
import Loading from "../../../../../components/Loading";
import {getEmptyFilters} from "../../../utils";
import {Request} from "../../../../../utils/request";
import {endpointExhibitionsFilters} from "../../../config";
import {connectFilters} from "../../../connectors";
import './index.scss';

const Option = props => (
    <components.Option {...props}>
        <span>{props.label}</span>
    </components.Option>
);

const CitiesFilter = ({setFiltersSuccess, CityIds, DateFrom}) => {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        (() => Request({
            url: `${endpointExhibitionsFilters}?DateFrom=${DateFrom}`
        }, data => {
            const cities = data.cities;
            if(cities.length) {
                setOptionsNotInValues(cities.filter(option => CityIds.indexOf(option.value) === -1));
                setValues(cities.filter(option => CityIds.indexOf(option.value) !== -1));
            }
            setLoading(false);
        },
        error => {
            console.log(error.response);
            if(error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, [DateFrom]);

    const handleChange = options => {
        setValues(options);
        setOptionsNotInValues(optionsNotInValues.filter(option => options.map(opt => opt.value).indexOf(option.value) === -1));
    };

    const onSubmit = (str) => {
        if(str === 'apply') {
            setFiltersSuccess({CityIds: values.map(option => option.value), PageNumber: 1});
        } else {
            setFiltersSuccess(getEmptyFilters());
        }
    };

    return loading ?
        <Loading/> :
        <>
            <Select
                id={'CitiesFilter'}
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
                classNamePrefix={'ExInput'}
                placeholder={'Начните вводить город'}
                noOptionsMessage={() => 'Город не найден'}
                value={values}
                components={{Option}}
            />
            <div className="exhibitions-filters__buttons">
                <button
                    className="btn btn-primary exhibitions-filters__button"
                    onClick={() => onSubmit('apply')}
                >
                    Применить
                </button>
                <button
                    className="btn exhibitions-filters__button"
                    onClick={() => onSubmit('clear')}
                >
                    Очистить
                </button>
            </div>
        </>
};

export default connectFilters(React.memo(CitiesFilter));