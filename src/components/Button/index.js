import React from 'react'
import './index.scss'

export const ButtonNext = ({children, onClick, className, disabled}) =>
    <button onClick={onClick}
            className={`btn btn-icon ${className ? ' ' + className : ''}`}
            disabled={disabled}
    >
        <span>{children}</span>
        <img src={'/static/icons/arrow-right.svg'} alt=""/>
    </button>;

const Button = ({children, onClick, className, disabled}) =>
    <button onClick={onClick}
            className={`btn${className ? ' ' + className : ''}`}
            disabled={disabled}
    >
        {children}

    </button>;

export default Button