import React from 'react';
import "./index.scss";


const Placeholder = () => (
    <div className="exhibition-placeholder">
        <div className="exhibition-placeholder__image">
            <div className="embed-responsive embed-responsive-16by9" />
        </div>
        <div className="exhibition-placeholder__content">
            <div className="heading line text" />
            <div className="text" />
            <div className="text line" />
            <div className="text line" />
            <div className="text longer" /><br />
            <div className="text" /><br />
            <div className="text longer" /><br />
            <div className="text" />
            <div className="button line text" />
        </div>
    </div>
);

export default React.memo(Placeholder);