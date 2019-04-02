import React from 'react'
import NoUserIcon from './NoUserIcon.svg'

export const UserIcon = ({url}) => <div className="widget-login__user-icon">
    <img
        src={url ? url : NoUserIcon}
        alt=""
    />
</div>;