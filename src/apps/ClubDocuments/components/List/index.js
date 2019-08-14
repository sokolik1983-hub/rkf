import React from 'react'
import ListDocument from './ListItem'
import {connectListDocument} from 'apps/ClubDocuments/connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {getlistUrl} from 'apps/ClubDocuments/config'

import './styles.scss'

function ClientDocumentList(props) {
    const {listIds, getClubDocumentsListSuccess, club_id, editable} = props;
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubDocumentsListSuccess);
    return (
        <div className="ClientDocumentList">
            {loading ?
                "Загрузка..."
                : listIds.map(id => <ListDocument editable={editable} key={id} id={id}/>)}
        </div>
    )

}

export default connectListDocument(ClientDocumentList)