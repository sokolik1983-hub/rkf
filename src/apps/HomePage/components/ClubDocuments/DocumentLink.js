import React from 'react'
import './DocumentLink.scss'

export default function ClubDocumentLink({ name, url }) {
    return (
        <li><a className="ClubDocumentLink link" href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>
    )
}