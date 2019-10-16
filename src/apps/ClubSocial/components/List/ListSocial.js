import React from 'react'


function ClubSocial({id, site, description, social_network_type_id}) {
    return (
        <div className="ClubSocial">
            <div className="ClubSocial__site">{site}</div>
            <div className="ClubSocial__description">{description}</div>
            {/*<div className="ClubSocial__type">{social_network_type_id}</div>*/}
        </div>
    )
}

export default ClubSocial