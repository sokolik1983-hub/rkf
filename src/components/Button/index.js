import React from 'react'
import {string, bool, func, object} from 'prop-types'
import {withRouter} from 'react-router'
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
            'btn-light',
            'btn-icon',
            'btn-next',
            {[className]: className}
        )}
        disabled={disabled}
    >
        <span>{children}</span>
        <img src={'/static/icons/chevron_right.svg'} alt=""/>
    </button>;


const ActionButton = ({
                          action,
                          style,
                          onClick,
                          className,
                          disabled,
                          type = 'button',
                          loading,
                          children,
                          leftIcon,
                          rightIcon,
                          history,
                          ...other,
                      }) => {

    const handleClick = action ? () => history.push(action) : onClick;

    return (
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
            onClick={handleClick}
            disabled={disabled || loading}
        >
            {
                leftIcon
            }

            {children}
            {
                rightIcon
            }
        </button>
    )
};

export const ActButton = withRouter(ActionButton);


function Button({
                    style,
                    onClick,
                    className,
                    disabled,
                    type = 'button',
                    loading,
                    children,
                    leftIcon,
                    rightIcon,
                    primary,
                    secondary,
                    condensed
                }) {
    return (
        <button
            style={style}
            className={classnames(
                'btn',
                {'btn--loading': loading},
                {'btn-icon': leftIcon || rightIcon},
                {'btn-icon--left': leftIcon},
                {'btn-icon--right': rightIcon},
                {'btn-primary': primary && !secondary},
                {'btn-secondary': secondary && !primary},
                {'btn-condensed': condensed},
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
        </button>
    )
}


Button.propTypes = {
    style: object,
    onClick: func,
    className: string,
    disabled: bool,
    type: string,
    loading: bool,
    primary: bool
};

export default Button