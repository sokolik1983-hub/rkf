import React from 'react'
import classnames from 'classnames'
import './styles.scss'

export default function CardMessage({children, className, lg, ...rest}) {
    return (
        <div
            className={classnames(
                'Card Card--message',
                {[className]: className},
                {'Card--lg': lg},
            )}
            {...rest}
        >
            {children}
        </div>
    )
}