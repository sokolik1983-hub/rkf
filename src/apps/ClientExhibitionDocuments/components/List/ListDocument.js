import React from 'react'


function ClintExhibitionDocument({name, url}) {
    return (
        <div className="ClintExhibitionDocument">
            <a href={url} target="__blank">{name}</a>
        </div>
    )
}

export default ClintExhibitionDocument