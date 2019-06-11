import React from 'react'
import classnames from 'classnames'
import './styles.scss'

const FormGroup = ({children, className, inline, style}) =>
    <div
        style={style}
        className={classnames(
            'form-group',
            {'form-group--inline': inline},
            {[className]: className},
        )}
    >
        {children}
    </div>;

export default FormGroup