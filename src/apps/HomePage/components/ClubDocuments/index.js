import React from 'react'
import ClubDocumentLink from './DocumentLink'
import { connectClubDocuments } from 'apps/HomePage/connectors'

function ClubDocuments({ documents = [] }) {
    return (
        documents.length
            ? <div className="ClubDocuments">
                <h4 className="text-upper" style={{ marginTop: '30px' }}>Документы</h4>
                <ul style={{ listStyle: 'none' }}>
                    {documents.map(document => <ClubDocumentLink key={document.id} {...document} />)}
                </ul>
            </div>
            : null
    )
}

export default connectClubDocuments(ClubDocuments)