import React, { useState, useEffect } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { filterBy } from '@progress/kendo-data-query';
import { listNoDataRender } from "../config.js";

const CitiesFilterKendo = ({ data, onChange, className }) => {
    const [values, setValues] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCities(data);
    }, [data]);

    const filterChange = (event) => {
        setCities(filterBy(data.slice(), event.filter));
    }

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
            data={cities}
            value={values}
            onChange={handleChange}
            textField="label"
            dataItemKey="value"
            className={className}
            placeholder="все"
            listNoDataRender={listNoDataRender}
            style={{ fontSize: '16px' }}
            filterable={true}
            onFilterChange={filterChange}
        />
    );
};

export default React.memo(CitiesFilterKendo);