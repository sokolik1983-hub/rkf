import React from 'react'
import {connectClintClubDocument} from 'apps/ClubDocuments/connectors'


function ClintClubDocument({name, url}) {
    return (
        <div className="ClintClubDocument">
            <a href={url} target="__blank">{name}</a>
        </div>
    )
}

export default connectClintClubDocument(ClintClubDocument)