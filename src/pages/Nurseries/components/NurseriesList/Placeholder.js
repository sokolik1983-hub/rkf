import React from 'react';

const Item = () => {
    return <div className="Placeholder">
        <div className="Placeholder__image">
            <div className="embed-responsive embed-responsive-16by9"></div>
        </div>
        <div className="Placeholder__content">
            <div className="heading line text"></div>
            <div className="text"></div><br />
            <div className="text line"></div>
            <div className="text longer"></div><br />
            <div className="text"></div>
        </div>
        <div className="Placeholder__mobile">
            <div className="text"></div>
            <div className="text line"></div>
            <div className="text longer"></div><br />
            <div className="text"></div><br />
            <div className="text longer"></div>
        </div>
    </div>
}

export const Placeholder = () => {
    return <div className="Placeholder__wrap">
        <Item />
        <Item />
        <Item />
        <Item />
    </div>
}

export default Placeholder;