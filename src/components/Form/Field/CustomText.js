import React from 'react';
import { connect, getIn, Field } from 'formik';
import Error from './Error';
import Label from './Label';

const CustomText = (props) => {
    const {formik, name} = props;

    const handleChange = ({ target }) => {
        formik.setFieldValue(name, target.value.replace(/[^a-zA-ZА-Яа-яЁё]/gi,''));
    }

    return (
        <div className={`FormInput${formik.errors[name] ? ' FormInput--error' : ''}`}>
            <Label htmlFor={name} label={props.label} />
            <Field
                value={getIn(formik.values, name)}
                onChange={handleChange}
                className="FormInput__input"
                {...props}
            />
            <Error name={name} />
        </div>
    )
}

export default connect(CustomText);