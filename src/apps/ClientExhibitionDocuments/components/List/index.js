import React, {useEffect} from 'react'
import {connectExhibitionDocumentsList} from 'apps/ClientExhibitionDocuments/connectors'
import ListItem from './ListItem'

function ClientExhibitionDocumentsList({getExhibitionDocuments, listIds}) {
    useEffect(() => {
        getExhibitionDocuments(12)
    }, []);
    return listIds.map(id => <ListItem key={id} id={id}/>)
}

export default connectExhibitionDocumentsList(ClientExhibitionDocumentsList)

