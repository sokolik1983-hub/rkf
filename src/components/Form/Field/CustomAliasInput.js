import React from "react";
import { connect, Field, getIn } from 'formik';

const AliasInput = ({ formik, onChange, name, url, id, loading, className, disabled, baseUrl, ...props }) => {
    const checkAlias = e => {
        let { value } = e.target;
        if (value === 'exhibitions' || value === 'clubs' || value === 'reports' || value === 'client' || value === 'dog_owner' || value === 'nursery') {
            alert('Данный адрес страницы запрещён');
            formik.setFieldValue(name, '');
        }
        return value;
    };

    const handleChange = ({ target }) => {
        formik.setFieldValue(name, target.value);
    }

    return <div className="AliasInput">
        <span style={{ "overflowWrap": "break-word" }}>{baseUrl}<strong>{getIn(formik.values, name)}</strong></span>
        <Field
            value={getIn(formik.values, name)}
            onChange={handleChange}
            onBlur={checkAlias}
            className="FormInput__input"
            {...props}
        />
    </div>
}

export default connect(AliasInput);