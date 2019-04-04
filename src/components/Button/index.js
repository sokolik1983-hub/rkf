import React from 'react'
import './index.scss'

const Button = ({children, onClick, className, disabled}) =>
    <button onClick={onClick}
            className={`btn${className ? ' ' + className : ''}`}
            disabled={disabled}
    >
        {children}
    </button>;

export default Button