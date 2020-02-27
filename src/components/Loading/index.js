import React from 'react'
import './index.scss'

const Loading = ({ centered = true }) => (
    <div className={`Loading${centered && ' centered'}`} >
        <div className="Loading__title" />
    </div >
);

export default Loading;