import React from 'react';
import { connect, getIn } from 'formik';


const FieldError = ({ formik, name, errName, noTouch = false }) => {
    const error = name ? getIn(formik.errors, errName || name) : null;
    const touch = noTouch ? true : getIn(formik.touched, name);
    return touch && error ? <div className={noTouch ? 'FormInput__custom-error' : 'FormInput__error'}>{error}</div> : null;
};

export default connect(FieldError);
