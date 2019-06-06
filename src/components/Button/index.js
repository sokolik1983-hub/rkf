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
                    onClick,
                    className,
                    disabled,
                    type = 'button',
                    loading,
                    children,
                    leftIcon,
                    rightIcon
                }) =>

    <button
        style={style}
        className={classnames(
            'btn',
            {'btn--loading': loading},
            {'btn-icon': leftIcon || rightIcon},
            {'btn-icon--left': leftIcon},
            {'btn-icon--right': rightIcon},
            {[className]: className}
        )}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
    >
        {
            leftIcon
        }

        {children}
        {
            rightIcon
        }
    </button>;

export default Button