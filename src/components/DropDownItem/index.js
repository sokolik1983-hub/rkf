import React from 'react';
import './index.scss'

export const DropDownItem = ({active, onClick,children}) =>
    <div onClick={onClick} className={`drop-down__item${active ? ' drop-down__item--active' : ''}`}>
        {children}
    </div>;