import React from "react";

import "./index.scss";

const InitialsAvatar = ({firstName, lastName, card}) => {

    const newName = firstName?.split('');
    const newLastName = lastName?.split('');

    return (
        <div className={`avatar__wrap ${card ? card : ""}`}>
            <div className="avatar__name-wrap">
                <span>{newName && newName[0]}</span>
                <span>{newLastName && newLastName[0]}</span>
            </div>
        </div>
    )
};

export default InitialsAvatar;