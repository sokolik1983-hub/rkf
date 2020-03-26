import React from "react";
import "./index.scss";

const DeleteButton = ({ title, large, small, onClick }) => (
    <label
        onClick={onClick}
        title={title}
        className={`delete-button ${large ? 'plus-button--large':''} ${small ? 'plus-button--small':''}`}
    />
);

export default React.memo(DeleteButton);
