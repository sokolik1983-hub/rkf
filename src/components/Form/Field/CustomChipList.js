import React, {useEffect} from "react";
import { connect, Field } from 'formik';
import {useState} from "react";
import { ChipList} from '@progress/kendo-react-buttons';
import Label from './Label';
import Error from './Error';
import './CustomChipList.scss';

const CustomChipList = ({ formik, name, label, options, setIsMating, advertTypeId }) => {
    const { setFieldValue, errors } = formik;
    const [activeElem, setActiveElem] = useState((+advertTypeId));

    const handleChange = ({ value }) => {
        setFieldValue(name, value || advertTypeId);
        if (value === 3 || advertTypeId === 3) {
            setIsMating(true);
        } else {
            setIsMating(false);
        }
        setActiveElem(value);
    };

    return (
        <div className={`FormInput${errors[name] ? ' FormInput--error' : ''}`}>
            <Label htmlFor={name} label={label} />
            <ChipList
                data={options}
                value={activeElem}
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