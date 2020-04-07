import React from "react";
import { connect } from 'formik';

const FormFile = ({formik, onChange, name, ...props}) => 
    <input {...props} name={name} type="file" onBlur={formik.handleBlur} onChange={e => { 
        formik.setFieldValue(name, e.currentTarget.files[0]);
        onChange && onChange(e);
    }} />

export default connect(FormFile);
