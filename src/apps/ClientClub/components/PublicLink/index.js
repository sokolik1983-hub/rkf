import React from 'react'
import {Link} from 'react-router-dom'
import {connectClubPublicLink} from 'apps/ClientClub/connectors'

function ClubPublicLink({club_alias}) {
    return (
        <Link style={{marginLeft: 'auto'}} className="btn btn-primary" to={`/${club_alias}`}>На мою
            страницу</Link>

    )
}

export default connectClubPublicLink(ClubPublicLink)
