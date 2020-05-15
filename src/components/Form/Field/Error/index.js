import React from 'react';
import { connect, getIn } from 'formik';


const FieldError = ({ formik, name, noTouch = false }) => {
    const error = name ? getIn(formik.errors, name) : null;
    const touch = noTouch ? true : getIn(formik.touched, name);
    return touch && error && typeof error !== 'object' ? <div className={noTouch ? 'FormInput__custom-error' : 'FormInput__error'}>{error}</div> : null;
};

export default connect(FieldError);
