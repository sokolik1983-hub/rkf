import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {getTimeFromDate} from 'utils/datetime'
import {connectExhibitionsListItem} from 'apps/Exhibitions/connectors'
import './index.scss'

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

function ExhibitionsListItem(props) {
    console.log(props)
    const {id, city, exhibition_name, start_datetime, end_datetime, participants_count} = props;
    const {path} = useContext(ExhibitionsPathContext);
    return (
        <div id={'exhibitionsListItem_' + id} className="exhibition-list-item">
            <div className="exhibition-list-item__header">
                <div className="exhibition-list-item__city">
                    {city}
                </div>
                <div
                    className="exhibition-list-item__datetime">
                    {getTimeFromDate(start_datetime)} - {getTimeFromDate(end_datetime)}
                </div>
            </div>
            <div className="exhibition-list-item__title">{exhibition_name}</div>
            <div className="exhibition-list-item__participants-count">
                Количество участников: <span>{participants_count}</span>
            </div>
            <div className="exhibition-list-item__controls">
                <Link to={`${path}/${id}/details`} className="btn btn-primary">Смотреть</Link>
            </div>
        </div>
    )
};

export default connectExhibitionsListItem(ExhibitionsListItem)