import React from "react";
import "./index.scss";

const DeleteButton = ({ title, large, small, onClick, className }) => (
    <label
        onClick={onClick}
        title={title}
        className={`delete-button ${large ? 'plus-button--large':''} ${small ? 'plus-button--small':''} ` + className}
    />
);

export default React.memo(DeleteButton);
