import React from 'react'
import classnames from 'classnames'
import './index.scss'

const Col = ({children, className}) =>
    <div className={classnames('flx-col', {[`${className}`]: className})}>
        {children}
    </div>

export default Col;