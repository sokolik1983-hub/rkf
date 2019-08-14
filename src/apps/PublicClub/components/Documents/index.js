import React from 'react'
import {connectPublicClubDocuments} from 'apps/PublicClub/connectors'
import Document from './Document'
import './styles.scss'

function PublicClubDocuments({documents}) {
    return (
        <div className="PublicClubDocuments">
            <h3>Документы</h3>
            {documents.map(document => <Document key={document.id} {...document}/>)}
        </div>
    )
}

export default connectPublicClubDocuments(PublicClubDocuments)