import React, {useEffect} from "react";
import { connect, Field } from 'formik';
import {useState} from "react";
import { ChipList} from '@progress/kendo-react-buttons';
import Label from './Label';
import Error from './Error';
import './CustomChipList.scss';

const CustomChipList = ({ formik, name, label, options, setIsMating, advertTypeId, setActiveElem, activeElem }) => {
    const { setFieldValue, errors } = formik;

    console.log('activeElem', activeElem)

    const handleChange = ({ value }) => {
        setFieldValue(name, value);
        setIsMating(value === 3);
        setActiveElem(value);
        // setIsTypeId(value);
    };

    useEffect(() => {
        setIsMating(advertTypeId === 3);
    }, []);

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