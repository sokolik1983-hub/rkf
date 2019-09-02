import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import ExhibitionDateHelper from 'components/Exhibitions/ExhibitionDateHelper'
import {connectExhibitionsListItem} from 'apps/Exhibitions/connectors'
import './index.scss'

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

function ExhibitionsListItem(props) {
    const {id, city, exhibition_name, dates} = props;
    const {path} = useContext(ExhibitionsPathContext);
    return (
        <div id={'ExhibitionsListItem_' + id} className="ExhibitionsListItem">
            <div className="ExhibitionsListItem__header">
                <div className="ExhibitionsListItem__city">
                    {city}
                </div>
                <div
                    className="ExhibitionsListItem__datetime">
                    {
                        dates.map((date,index)=><ExhibitionDateHelper key={index} {...date}/>)
                    }
                </div>
            </div>
            <div className="ExhibitionsListItem__title">
                <Link to={`${path}/${id}/details`}>
                    {exhibition_name}
                </Link>
            </div>
        </div>
    )
};

export default connectExhibitionsListItem(ExhibitionsListItem)