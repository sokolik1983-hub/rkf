import React from 'react'
import {Link} from 'react-router-dom'
export const UserLogin = ({title = 'No UserName'}) => <div className="widget-login__user-login"><Link to={'/client'}>{title}</Link></div>;