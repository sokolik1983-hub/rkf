import React from 'react'
import {connectExhibitionDocument} from 'apps/ExhibitionDocuments/connectors'

function ExhibitionDocument({id, name, url}) {
    return (
        <div id={`ExhibitionDocument_${id}`} className="ExhibitionDocument">
            <a href={url} target="__blank">{name}</a>
        </div>
    )
}

export default connectExhibitionDocument(ExhibitionDocument)