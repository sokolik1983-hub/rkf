import React from 'react'
import './index.scss'

const Button = ({children, onClick}) => <button onClick={onClick} className="btn">{children}</button>;

export default Button