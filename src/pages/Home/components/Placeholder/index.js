import React from 'react';
import './style.scss';

const ExhCard = () => {
    return <div className="Placeholder">
        <div className="Placeholder__image">
            <div className="embed-responsive embed-responsive-16by9"></div>
        </div>
        <div className="Placeholder__content">
            <div className="heading line text"></div>
            <div className="text"></div>
            <div className="text line"></div>
            <div className="text line"></div>
            <div className="text longer"></div><br />
            <div className="text"></div><br />
            <div className="text longer"></div><br />
            <div className="text"></div>
            <div className="button line text"></div>
        </div>
    </div>
}

const NewsCard = () => {
    return <div className="Placeholder">
        <div className="Placeholder__image">
            <div className="embed-responsive embed-responsive-16by9"></div>
        </div>
        <div className="Placeholder__content">
            <div className="heading line text"></div>
            <div className="text line"></div>
            <div className="text line"></div>
            <div className="text longer"></div><br />
            <div className="text"></div><br />
        </div>
    </div>
}

export const NewsPlaceholder = () => {
    return <div className="Placeholder__wrap">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
    </div>
}

const Placeholder = () => {
    return <div className="Placeholder__wrap">
        <ExhCard />
        <ExhCard />
        <ExhCard />
    </div>
}

export default Placeholder;