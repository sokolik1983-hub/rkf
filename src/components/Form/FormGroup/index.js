import React from 'react'
import classnames from 'classnames'
import './styles.scss'

const FormGroup = ({children, inline}) =>
    <div
        className={classnames('form-group', {'form-group--inline': inline})}
    >
        {children}
    </div>;

export default FormGroup