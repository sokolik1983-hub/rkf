import React from 'react';
import {Field} from 'formik'

const TextArea = ({name, className, ...fieldProps}) => <Field name={name} className={className}{...fieldProps} component="textarea"/>;

export default TextArea