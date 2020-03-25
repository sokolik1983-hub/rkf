import React from "react";
import "./index.scss";

const PlusButton = ({ title, large, small, onClick }) => (
    <button
        onClick={onClick}
        type="button"
        title={title}
        className={`plus-button ${large ? 'plus-button--large':''} ${small ? 'plus-button--small':''}`}
    />
);

export default React.memo(PlusButton);
