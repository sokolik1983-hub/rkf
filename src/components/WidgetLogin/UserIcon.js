import React from 'react'
import NoUserIcon from './NoUserIcon.svg'
import {Link} from 'react-router-dom'

export const UserIcon = ({url}) => <div className="widget-login__user-icon">
    <Link to="/registration"><img
        src={url ? url : NoUserIcon}
        alt=""
    /></Link>
</div>;