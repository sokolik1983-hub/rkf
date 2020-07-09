import React from 'react';

const Item = () => (
    <div className="Placeholder">
        <div className="Placeholder__image">
            <div className="embed-responsive embed-responsive-16by9" />
        </div>
        <div className="Placeholder__content">
            <div className="heading line text" />
            <div className="text line" />
            <div className="text line" />
            <div className="text longer" /><br />
            <div className="text" /><br />
        </div>
    </div>
);

export const Placeholder = () => (
    <div className="Placeholder__wrap">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
    </div>
);

export default React.memo(Placeholder);