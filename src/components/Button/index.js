import React from 'react'
import classnames from 'classnames'
import './index.scss'

export const ButtonNext = ({
                               children,
                               type = 'button',
                               onClick,
                               className,
                               disabled
                           }) =>
    <button
        type={type}
        onClick={onClick}
        className={classnames(
            'btn',
            'btn-icon',
            {[className]: className}
        )}
        disabled={disabled}
    >
        <span>{children}</span>
        <img src={'/static/icons/arrow-right.svg'} alt=""/>
    </button>;

const Button = ({
                    style,
                    children,
                    onClick,
                    className,
                    disabled,
                    type = 'button'
                }) =>
    <button
        style={style}
        className={classnames(
            'btn',
            {[className]: className}
        )}
        type={type}
        onClick={onClick}
        disabled={disabled}
    >
        {children}

    </button>;

export default Button