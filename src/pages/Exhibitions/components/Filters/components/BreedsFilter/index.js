import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../../utils";
import {customStyles} from "../../config.js";
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

const BreedsFilter = ({breeds, BreedIds}) => {
    const [values, setValues] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if(breeds.length) {
            const optionValues = breeds.filter(option => BreedIds.indexOf(option.value) !== -1);
            const optionsNotInValues = breeds.filter(option => BreedIds.indexOf(option.value) === -1);

            setValues([...optionValues]);
            setOptions([...optionValues, ...optionsNotInValues]);
        }
    }, [breeds, BreedIds]);

    const handleChange = options => {
        setFiltersToUrl({BreedIds: options.map(option => option.value)});
    };

    const handleDelete = breedId => {
        setFiltersToUrl({BreedIds: values.filter(breed => breed.value !== breedId).map(breed => breed.value)});
    };

    return (
        <div className="breeds-filter">
            <h5 className="breeds-filter__title">Породы</h5>
            <Select
                id="breeds-filter"
                isMulti={true}
                closeMenuOnSelect={false}
                options={options}
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
            {!!values.length &&
                <ul className="breeds-filter__values">
                    {values.map(item =>
                        <li className="breeds-filter__values-item" key={item.value}>
                            <span>{item.label}</span>
                            <button type="button" onClick={() => handleDelete(item.value)}>✕</button>
                        </li>
                    )}
                </ul>
            }
        </div>
    )
};

export default React.memo(BreedsFilter);