import React from "react";

const BurgerButton = ({className, onClick}) => (
    <button className={`header__button${className ? ' ' + className : ''}`} onClick={onClick}>
        <span />
    </button>
);

export default React.memo(BurgerButton);