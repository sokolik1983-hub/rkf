import classnames from "classnames";
import React from "react";

export default function FilterButton({ type, onClick, filter, children }) {
    const handleClick = () => {
        onClick(type);
    };

    return (
        <button
            onClick={handleClick}
            className={classnames('exhibition-list__btn', {
                'exhibition-list__btn--active': filter === type
            })}
        >
            {children}
        </button>
    );
}