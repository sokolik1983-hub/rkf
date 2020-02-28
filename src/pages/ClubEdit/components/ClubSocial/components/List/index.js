import React from 'react'
import ListSocial from './ListItem'
import { connectListSocial } from '../../connectors';
import { useResourceAndStoreToRedux } from "shared/hooks";
import { getlistUrl } from '../../config';

import './styles.scss'

function ClientSocialList(props) {
    const { listIds, getClubSocialListSuccess, club_id, editable } = props;
    const url = getlistUrl + String(club_id);
    const { loading } = useResourceAndStoreToRedux(url, getClubSocialListSuccess);
    return (
        <div className="ClientSocialList">
            {loading ?
                "Загрузка..."
                : listIds.map(id => <ListSocial editable={editable} key={id} id={id} />)}
        </div>
    )

}

export default connectListSocial(ClientSocialList)