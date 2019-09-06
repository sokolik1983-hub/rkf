import React from 'react'
import classnames from 'classnames'
import './Img.scss'

export default function Img({ className, ...restProps }) {
    return (
        <img
            className={classnames('Img', { [className]: className })}
            {...restProps}
        />
    )
}
