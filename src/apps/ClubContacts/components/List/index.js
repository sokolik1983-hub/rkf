import React from 'react'
import ListContact from './ListItem'
import {connectListContact} from 'apps/ClubContacts/connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {getlistUrl} from 'apps/ClubContacts/config'

import './styles.scss'

function ClientContactList(props) {
    const {listIds, getClubContactsListSuccess, club_id} = props;
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubContactsListSuccess);
    return (
        <div className="ClientContactList">
            {loading ?
                "Загрузка..."
                : listIds.map(id => <ListContact key={id} id={id}/>)}
        </div>
    )

}

export default connectListContact(ClientContactList)