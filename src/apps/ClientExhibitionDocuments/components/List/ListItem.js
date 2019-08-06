import React from 'react'
import {connectListItem} from 'apps/ClientExhibitionDocuments/connectors'
function ExhibitionListDocument({title, link}) {
    return (
        <div className="ExhibitionListDocument">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {title}
            </a>
        </div>
    )
}

export default connectListItem(ExhibitionListDocument)