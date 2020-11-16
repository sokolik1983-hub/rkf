import React, { useState, useEffect } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { listNoDataRender } from "../config.js";
import { filterBy } from '@progress/kendo-data-query';

const BreedsFilterKendo = ({ data, onChange, className }) => {
    const [values, setValues] = useState([]);
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        setBreeds(data);
    }, [data]);

    const filterChange = (event) => {
        setBreeds(filterBy(data.slice(), event.filter));
    }

    const handleChange = e => {
        if (e.target.value) {
            setValues(e.target.value);

            let breedIds = [];
            e.target.value.forEach(option => {
                let keys = Object.keys(option);
                breedIds.push(option[keys[0]]);
            });
            onChange(breedIds);
        } else {
            setValues([]);
            onChange([]);
        }
    };

    return (
        <MultiSelect
            data={breeds}
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

export default React.memo(BreedsFilterKendo);