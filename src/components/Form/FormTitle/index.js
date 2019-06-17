import React from 'react'
import classnames from 'classnames'

const FormTitle = ({formTitle, className}) => formTitle ?
    <div className={classnames(
        "form-title",
        {[className]: className}
    )}
         dangerouslySetInnerHTML={{__html: formTitle}}
    />
    : null;

export default FormTitle;
