import React from 'react'
import ClubDocumentLink from './DocumentLink'
import {connectClubDocuments} from 'apps/HomePage/connectors'

function ClubDocuments({documents=[]}){

    return(
        <div className="ClubDocuments">
            {documents.map(document=><ClubDocumentLink key={document.id} {...document}/>)}
        </div>
    )
}

export default connectClubDocuments(ClubDocuments)