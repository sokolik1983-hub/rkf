import React from 'react'
import classnames from 'classnames'
import './styles.scss'

const FormGroup = ({children, className, inline, style}) =>
    <div
        style={style}
        className={classnames(
            'FormGroup',
            {'FormGroup--inline': inline},
            {[className]: className},
        )}
    >
        {children}
    </div>;

export default FormGroup