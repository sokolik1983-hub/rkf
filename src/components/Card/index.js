import React from 'react'
import classnames from 'classnames'
import './styles.scss'

const Card = ({children, className, lg}) =>
    <div className={
        classnames(
            'card',
            {[className]: className},
            {'card--lg': lg},
        )
    }>
        {children}
    </div>;

export default Card;