import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import CustomCheckbox from "../../Form/CustomCheckbox";
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

const BreedsFilter = ({breeds, breed_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);

    useEffect(() => {
        if(breeds.length) {
            setOptionsNotInValues(breeds.filter(option => breed_ids.indexOf(option.value) === -1));
            setValues(breeds.filter(option => breed_ids.indexOf(option.value) !== -1));
        }
    }, [breeds, breed_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = breedId => {
        onChange(values.filter(breed => breed.value !== breedId).map(breed => breed.value));
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