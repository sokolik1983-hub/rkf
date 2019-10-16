import React from 'react';
import './index.scss';

const CustomCheckbox = ({id, label, checked, onChange}) => (
    <div className="custom-checkbox">
        <input type="checkbox"
               id={id}
               className="custom-checkbox__input"
               checked={!!checked}
               onChange={onChange}
        />
        <label htmlFor={id} className="custom-checkbox__label">{label}</label>
    </div>
);

export default CustomCheckbox;