import React from 'react'
import './index.scss'

const Loading = ({ centered = true, inline = false }) => {
    let classes = 'Loading';
    classes += inline ? ' inline' : centered ? ' centered' : '';

    return <div className={classes} >
        <div className="Loading__title" />
    </div >
};

export default Loading;