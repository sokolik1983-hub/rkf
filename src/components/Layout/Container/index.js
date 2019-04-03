import React from 'react'
import './index.scss'

const Container = ({children, className}) =>
    <div className={`container ${className ? className : ''}`}>{children}</div>;

export default Container;