import React from 'react'
import classnames from 'classnames'
import './styles.scss'

const FormInput = ({children, error}) =>
    <div
        className={classnames('form-input', {'form-group--error': error})}
    >
        {children}
    </div>;

export default FormInput