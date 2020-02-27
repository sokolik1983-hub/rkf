import React from 'react'


function ClubSocial({ id, site, description, social_network_type_id }) {
    return (
        <div className="ClubSocial">
            <div className="ClubSocial__site"><a href={site} target="_blank" rel="noopener noreferrer">{site}</a></div>
            <div className="ClubSocial__description">&nbsp;{description}</div>
            {/*<div className="ClubSocial__type">{social_network_type_id}</div>*/}
        </div>
    )
}

export default ClubSocial