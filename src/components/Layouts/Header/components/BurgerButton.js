import React from "react";

const BurgerButton = ({className, onClick}) => (
    <button className={`header__button${className ? ' ' + className : ''}`} onClick={onClick}>
        <span />
        <span />
        <span />
    </button>
);

export default React.memo(BurgerButton);