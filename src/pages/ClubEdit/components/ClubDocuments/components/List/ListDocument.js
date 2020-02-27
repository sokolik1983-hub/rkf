import React from 'react'


function ClintClubDocument({name, url}) {
    return (
        <div className="ClintClubDocument">
            <a href={url} target="__blank">{name}</a>
        </div>
    )
}

export default ClintClubDocument