import React from "react";
import Select from "react-select";

const multiSelect = ({options} = {}) => {
    const MultiSelect = ({value, onValue}) => (
            <Select
                defaultValue={value.length ? value : []}
                isMulti
                name="groups"
                options={options}
                onChange={onValue}
                className="basic-multi-select"
                classNamePrefix="select"
            />
    );

    return MultiSelect;
};

export default multiSelect;