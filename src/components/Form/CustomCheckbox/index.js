import React, {memo} from 'react';

import './index.scss';


const CustomCheckbox = ({id, label, checked, onChange, disabled, style, cName}) => (
    <div className={`custom-checkbox${disabled ? ' disabled' : ''} ${cName ? cName : ''}`} style={style}>
        <input type="checkbox"
            id={id}
            className="custom-checkbox__input"
            checked={!!checked}
            onChange={onChange}
            disabled={!!disabled}
        />
        <label htmlFor={id} className="custom-checkbox__label" onClick={e => e.stopPropagation()}>{label}</label>
    </div>
);

export default memo(CustomCheckbox);
