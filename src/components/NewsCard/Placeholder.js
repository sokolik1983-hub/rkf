import React from "react";
import "./index.scss";


export const Placeholder = () => (
    <div className="news-placeholder">
        <div className="news-placeholder__image">
            <div className="embed-responsive embed-responsive-16by9" />
        </div>
        <div className="news-placeholder__content">
            <div className="heading line text" />
            <div className="text line" />
            <div className="text line" />
            <div className="text longer" /><br />
            <div className="text" /><br />
        </div>
    </div>
);

export default React.memo(Placeholder);