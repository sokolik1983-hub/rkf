import React, { useState, useEffect } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { listNoDataRender } from "../config.js";
import "./index.scss";

const CitiesFilterKendo = ({data, city_ids, onChange, className}) => {
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (data.length) {
            setValues(data.filter(option => city_ids.indexOf(option.value) !== -1));
        }
    }, [data, city_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleFilterChange = cityId => {
        onChange(values.filter(city => city.value !== cityId).map(city => city.value));
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

export default React.memo(CitiesFilterKendo);