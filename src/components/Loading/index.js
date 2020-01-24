import React from 'react'
import './index.scss'

const Loading = ({ centered = true }) => (
    <div className={centered ? 'centered-block Loading' : 'Loading'} >
        <div className="Loading__title">Загрузка...</div>
    </div >
);

export const InlineLoading = () => (
    <div className="Loading" >
        <div className="Loading__title">Загрузка...</div>
    </div >
);

export default Loading;