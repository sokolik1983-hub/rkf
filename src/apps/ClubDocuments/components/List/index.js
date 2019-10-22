import React, {useEffect, useState} from 'react'
import ListDocument from './ListItem'
import {connectListDocument} from 'apps/ClubDocuments/connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {getlistUrl} from 'apps/ClubDocuments/config'
// import {Request} from 'utils/request'
import './styles.scss'

function ClientDocumentList(props) {
    const {listIds, getClubDocumentsListSuccess, club_id, editable} = props;
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubDocumentsListSuccess);
    // const [loading, setLoading] = useState(true);
    // useEffect( () => {
    //     const url = getlistUrl + String(club_id);
    //     (async () => {
    //         await Request({url}, getClubDocumentsListSuccess);
    //         setLoading(false);
    //     })();
    // }, []);

    return (
        <div className="ClientDocumentList">
            {loading ?
                "Загрузка..."
                : listIds.map(id => <ListDocument editable={editable} key={id} id={id}/>)}
        </div>
    )

}

export default connectListDocument(ClientDocumentList)