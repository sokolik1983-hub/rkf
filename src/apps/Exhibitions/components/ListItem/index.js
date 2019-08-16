import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {timeSecondsCutter} from 'utils/datetime'
import {connectExhibitionsListItem} from 'apps/Exhibitions/connectors'
import './index.scss'

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

function ExhibitionsListItem(props) {
    console.log(props)
    const {id, city, name, time_start, time_end} = props;
    const {path} = useContext(ExhibitionsPathContext);
    return (
        <div id={'exhibitionsListItem_' + id} className="exhibition-list-item">
            <div className="exhibition-list-item__header">
                <div className="exhibition-list-item__city">
                    {city}
                </div>
                <div
                    className="exhibition-list-item__datetime">
                    {timeSecondsCutter(time_start)} - {timeSecondsCutter(time_end)}
                </div>
            </div>
            <div className="exhibition-list-item__title">{name}</div>
            <div className="exhibition-list-item__controls">
                <Link to={`${path}/${id}/details`} className="btn btn-primary">Смотреть</Link>
            </div>
        </div>
    )
};

export default connectExhibitionsListItem(ExhibitionsListItem)