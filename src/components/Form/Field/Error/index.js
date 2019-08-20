import React from 'react';
import {connect, getIn} from 'formik';


const FieldError = ({formik, name}) => {
    const error = getIn(formik.errors, name);
    const touch = getIn(formik.touched, name);
    return touch && error ? <div className="FormInput__feedback">{error}</div> : null;
};

export default connect(FieldError);