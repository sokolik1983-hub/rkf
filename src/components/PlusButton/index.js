import React from "react";
import "./index.scss";

const PlusButton = ({ large, small, onClick }) => (
    <button
        onClick={onClick}
        type="button"
        className={`plus-button ${large ? 'plus-button--large':''} ${small ? 'plus-button--small':''}`}
    />
);

export default React.memo(PlusButton);