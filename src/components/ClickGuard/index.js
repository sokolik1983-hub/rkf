import React from 'react';
import './styles.scss';

const ClickGuard = ({ value, callback }) => {
    return value ? <div className="click-guard" onClick={callback}></div> : null;
}

export default ClickGuard;