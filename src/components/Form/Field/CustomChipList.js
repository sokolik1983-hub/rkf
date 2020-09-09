import React from "react";
import { connect, Field } from 'formik';
import { ChipList } from '@progress/kendo-react-buttons';
import Label from './Label';
import Error from './Error';
import './CustomChipList.scss';

const CustomChipList = ({ formik, name, label, options }) => {
    const { setFieldValue, errors } = formik;
    const handleChange = ({ value }) => setFieldValue(name, value || '');

    return (
        <div className={`FormInput${errors[name] ? ' FormInput--error' : ''}`}>
            <Label htmlFor={name} label={label} />
            <ChipList
                data={options}
                selection="single"
                onChange={handleChange}
                className="CustomChipList"
            />
            <Field name={name} type="hidden" />
            <Error name={name} />
        </div>
    )


}

export default connect(CustomChipList);