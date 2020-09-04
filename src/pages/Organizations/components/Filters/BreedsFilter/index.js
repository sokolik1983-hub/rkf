import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import Loading from "../../../../../components/Loading";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {Request} from "../../../../../utils/request";
import {endpointGetKennelBreeds, endpointGetNKPBreeds} from "../../../config";
import {setFiltersToUrl} from "../../../utils";
import {customStyles} from "../config.js";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`breeds-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const BreedsFilter = ({breed_ids, organization_type}) => {
    const [loading, setLoading] = useState(true);
    const [breeds, setBreeds] = useState([]);
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        (() => Request({
                url: organization_type === 4 ? endpointGetKennelBreeds : endpointGetNKPBreeds
            }, data => {
                setBreeds(data.map(item => ({value: item.id, label: item.name})));
                setLoading(false);
                window.scrollTo(0,0);
            },
            error => {
                console.log(error.response);
                if(error.response) alert(`Ошибка: ${error.response.status}`);
                setLoading(false);
                window.scrollTo(0,0);
            }))();
    }, [organization_type]);

    useEffect(() => {
        if(breeds.length) {
            setOptionsNotInValues(breeds.filter(option => breed_ids.indexOf(option.value) === -1));
            setValues(breeds.filter(option => breed_ids.indexOf(option.value) !== -1));
        }
    }, [breeds, breed_ids]);

    const handleChange = options => {
        setFiltersToUrl({breed_ids: options.map(option => option.value)});
    };

    return loading ?
        <Loading centered={false}/> :
        <div className="breeds-filter">
            <h5 className="breeds-filter__title">Породы</h5>
            <Select
                id="breeds-filter"
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
                classNamePrefix="breeds-filter"
                placeholder="Начните вводить породу"
                noOptionsMessage={() => 'Порода не найдена'}
                value={values}
                components={{Option}}
                styles={customStyles}
            />
        </div>
};

export default React.memo(BreedsFilter);