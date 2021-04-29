import React from 'react';
import './index.scss';

const CustomCheckbox = ({ id, label, checked, onChange, disabled, style }) => (
    <div className={`custom-checkbox ${disabled ? "disabled" : ""}`} style={style}>
        <input type="checkbox"
            id={id}
            className="custom-checkbox__input"
            checked={!!checked}
            onChange={onChange}
            disabled={!!disabled}
        />
        <label htmlFor={id} className="custom-checkbox__label">{label}</label>
    </div>
);

export default CustomCheckbox;
