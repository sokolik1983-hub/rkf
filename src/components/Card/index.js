import React from 'react'
import classnames from 'classnames'
import './styles.scss'

export default function Card({children, className, lg, ...rest}) {
    return (
        <div
            className={classnames(
                'Card 111',
                {[className]: className},
                {'Card--lg': lg},
            )}
            {...rest}
        >
            {children}
        </div>
    )
}