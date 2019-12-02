import React from "react";

const BurgerButton = ({className, onClick}) => (
    <button className={`Header__button${className ? ' ' + className : ''}`} onClick={onClick} >
        <span />
        <span />
        <span />
    </button>
);

export default BurgerButton;