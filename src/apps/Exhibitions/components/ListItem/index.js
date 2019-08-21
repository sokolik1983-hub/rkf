import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {timeSecondsCutter} from 'utils/datetime'
import {connectExhibitionsListItem} from 'apps/Exhibitions/connectors'
import './index.scss'

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

function ExhibitionsListItem(props) {
    const {id, city, name, time_start, time_end} = props;
    const {path} = useContext(ExhibitionsPathContext);
    return (
        <div id={'ExhibitionsListItem_' + id} className="ExhibitionsListItem">
            <div className="ExhibitionsListItem__header">
                <div className="ExhibitionsListItem__city">
                    {city}
                </div>
                <div
                    className="ExhibitionsListItem__datetime">
                    {timeSecondsCutter(time_start)} - {timeSecondsCutter(time_end)}
                </div>
            </div>
            <div className="ExhibitionsListItem__title">
                <Link to={`${path}/${id}/details`}>
                    {name}
                </Link>
            </div>
            {/*<div className="ExhibitionsListItem__controls">*/}
            {/*    <Link to={`${path}/${id}/details`} className="btn">Смотреть</Link>*/}
            {/*</div>*/}
        </div>
    )
};

export default connectExhibitionsListItem(ExhibitionsListItem)