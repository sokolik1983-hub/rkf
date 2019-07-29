import React from 'react'
import {connectClubInfo} from 'apps/ClubInfo/connectors'

function ClubInfo({id, address, site, description}) {
    return (
        <div id={`ClubInfo_${id}`} className="ClubInfo">
            <div className="ClubInfo__address">address: {address}</div>
            <div className="ClubInfo__site">site: {site}</div>
            <div className="ClubInfo__description">description: {description}</div>
        </div>
    )
}

export default connectClubInfo(ClubInfo)