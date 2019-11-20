import React from 'react'
import './index.scss'


const Content = ({children, className}) => <div className={`Content${className ? ' ' + className : ''}`}>{children}</div>;

export default Content;