import React from 'react'
import './index.scss'

const ListItem = ({id, title, start_datetime, end_datetime, city}) =>
    <div className="exhibition-list-item">
        <div className="exhibition-list-item__header">
            <div className="exhibition-list-item__city">{city}</div>
            <div className="exhibition-list-item__datetime">{start_datetime}</div>
            <div className="exhibition-list-item__title">{end_datetime}</div>
        </div>
        <div className="exhibition-list-item__title">{title}</div>
    </div>;

export default ListItem;