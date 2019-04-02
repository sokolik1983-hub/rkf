import React from 'react'

export const UserMenu = ({opened, children}) =>
    <div className={`widget-login__dropdown${opened?' widget-login__dropdown--opened':''}`}>
        {children}
    </div>;