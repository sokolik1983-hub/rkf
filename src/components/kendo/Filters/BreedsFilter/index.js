import React, { useState, useEffect } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { listNoDataRender } from "../config.js";
import "./index.scss";

const BreedsFilterKendo = ({ data, breed_ids, onChange, className }) => {
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (data.length) {
            setValues(data.filter(option => breed_ids.indexOf(option.value) !== -1));
        }
    }, [data, breed_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleFilterChange = breedId => {
        onChange(values.filter(breed => breed.value !== breedId).map(breed => breed.value));
    };

    return (
        <MultiSelect
            data={data}
            value={values}
            onChange={handleChange}
            textField="label"
            dataItemKey="value"
            className={className}
            placeholder="все"
            defaultValue={{
                value: null,
                label: "все"
            }}
            filterable={true}
            onFilterChange={handleFilterChange}
            listNoDataRender={listNoDataRender}
        />
    );
};

export default React.memo(BreedsFilterKendo);