import React, { useState } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { listNoDataRender } from "../config.js";

const CitiesFilterKendo = ({ data, onChange, className }) => {
    const [values, setValues] = useState([]);

    const handleChange = e => {
        if (e.target.value) {
            setValues(e.target.value);

            let cityIds = [];
            e.target.value.forEach(option => {
                let keys = Object.keys(option);
                cityIds.push(option[keys[0]])
            })
            onChange(cityIds);
        } else {
            setValues([]);
            onChange([]);
        }
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
            listNoDataRender={listNoDataRender}
            style={{ fontSize: '16px' }}
        />
    );
};

export default React.memo(CitiesFilterKendo);