import React from 'react'
import classnames from 'classnames'
import './index.scss'


const Row = ({children, className}) =>
    <div className={classnames('flx-row', {[`${className}`]: className})}>
        {children}
    </div>;

export default Row;