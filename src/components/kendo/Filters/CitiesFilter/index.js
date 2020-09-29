import React from 'react';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import './index.scss';

const CitiesFilterKendo = ({data, onChange, className}) => {

    return (
        <MultiSelect 
            data={data}
            onChange={onChange}
            textField="label"
            dataItemKey="value"
            className={className}
        />
    );
};

export default React.memo(CitiesFilterKendo);