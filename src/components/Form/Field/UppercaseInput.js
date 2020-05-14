import React from 'react';
import { connect, getIn, Field } from 'formik';
import Error from './Error';
import Label from './Label';

const UppercaseInput = ({ formik, name, ...props }) => {
    const handleChange = ({ target }) => {
        formik.setFieldValue(name, target.value.toUpperCase());
    }
    return <div className="FormInput">
        <Label htmlFor={name} label={props.label} />
        <Field
            value={getIn(formik.values, name)}
            onChange={handleChange}
            className="FormInput__input"
            {...props}
        />
        <Error name={name} />
    </div>
}

export default connect(UppercaseInput);