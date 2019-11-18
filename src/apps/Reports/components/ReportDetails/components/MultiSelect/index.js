import React from "react";
import Select from "react-select";

const multiSelect = ({options, property} = {}) => {
    const placeholder = property === 'breed' ? options[0].label : 'Выберите группу';
    const MultiSelect = ({value, onValue}) => (
            <Select
                defaultValue={value.length ? value : []}
                isMulti
                name="groups"
                placeholder={placeholder}
                options={options}
                onChange={onValue}
                className="basic-multi-select"
                classNamePrefix="select"
            />
    );

    return MultiSelect;
};

export default multiSelect;