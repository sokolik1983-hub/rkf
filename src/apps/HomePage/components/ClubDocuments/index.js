import React from 'react'
import ClubDocumentLink from './DocumentLink'
import { connectClubDocuments } from 'apps/HomePage/connectors'

function ClubDocuments({ documents = [] }) {

    return (
        <div className="ClubDocuments">
            {documents ? <h4 className="text-upper" style={{ marginTop: '30px' }}>Документы</h4> : null}
            {documents.map(document => <ClubDocumentLink key={document.id} {...document} />)}
        </div>
    )
}

export default connectClubDocuments(ClubDocuments)