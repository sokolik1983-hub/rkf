import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExhibitionDateHelper from 'components/Exhibitions/ExhibitionDateHelper';
import { connectExhibitionsListItem } from 'apps/Exhibitions/connectors';
import EditLink from './EditLink'
import './index.scss';
import { ExhibitionsPathContext } from 'apps/Exhibitions/context';


function ExhibitionsListItem(props) {
    const { id, city, exhibition_name, dates, clubId, club_id } = props;
    const { path } = useContext(ExhibitionsPathContext);
    const canEdit = club_id === clubId;

    return (
        <Link to={`${path}/${id}/details`} id={'ExhibitionsListItem_' + id} className="ExhibitionsListItem">
            <div className="ExhibitionsListItem__header">
                 <div className="ExhibitionsListItem__city">{city}</div>
                 <div className="ExhibitionsListItem__datetime">
                     {dates.map((date, index) => (
                         <ExhibitionDateHelper key={index} {...date} />
                     ))}
                 </div>
            </div>
            <div className="ExhibitionsListItem__title">
                {exhibition_name}
            </div>
            {canEdit && <div className="Controls">
                <EditLink exhibitionId={id} canEdit={canEdit} />
            </div>}
        </Link>
    );
}

export default connectExhibitionsListItem(ExhibitionsListItem);
