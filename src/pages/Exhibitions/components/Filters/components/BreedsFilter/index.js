import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../../utils";
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
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        if(breeds.length) {
            setValues(breeds.filter(option => BreedIds.indexOf(option.value) !== -1));
            setOptionsNotInValues(breeds.filter(option => BreedIds.indexOf(option.value) === -1));
        }
    }, [breeds, BreedIds]);

    const handleChange = options => {
        setFiltersToUrl({BreedIds: options.map(option => option.value)});
    };

    return (
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
            />
        </div>
    )
};

export default React.memo(BreedsFilter);