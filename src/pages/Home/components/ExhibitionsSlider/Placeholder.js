import React from 'react';

const Placeholder = () => (
    <div className="Placeholder">
        <div className="Placeholder__image">
            <div className="embed-responsive embed-responsive-16by9" />
        </div>
        <div className="Placeholder__content">
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