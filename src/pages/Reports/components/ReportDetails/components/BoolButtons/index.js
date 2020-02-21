import React from "react";
import './styles.scss';

const boolButtons = ({props} = {}) => {
    const BoolButtons = ({value, onValue}) => (
        <div className="bool-buttons">
            <button className="bool-buttons__true" onClick={() => onValue(true)} >&#10003;</button>
            <button className="bool-buttons__false" onClick={() => onValue(false)} >&#10007;</button>
        </div>
    );

    return BoolButtons;
};

export default boolButtons;