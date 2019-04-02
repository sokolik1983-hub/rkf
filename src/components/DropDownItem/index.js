import React from 'react';
import './index.scss'

export const DropDownItem = ({active, children}) =>
    <div className={`drop-down__item${active ? ' drop-down__item--active' : ''}`}>
        {children}
    </div>;