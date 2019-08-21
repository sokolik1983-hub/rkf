import React from 'react';
import {CheckBoxSVG} from './svg';
import './FilterCheckbox.scss'

function Checkbox(props) {
    const {label, checked, count} = props;
    const onClick = () => {
        props.onClick(props.value)
    };
    return (
        <div onClick={onClick}
             className={`filter-checkbox${checked ? ' filter-checkbox--checked' : ''}`}>
            <CheckBoxSVG checked={checked}/>
            <div className="filter-checkbox__label">{label}</div>
            {count ? <div className="filter-checkbox__count">{count}</div> : null}
        </div>
    )
}
export default React.memo(Checkbox)

