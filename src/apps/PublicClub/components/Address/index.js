import React from 'react'
import Card from 'components/Card'
import {connectPublicClubAddress} from 'apps/PublicClub/connectors'

function PublicClubDescription({description}) {
    return (
        <Card className="ClientHome__Description">{description}</Card>
    )
}

export default connectPublicClubAddress(PublicClubDescription);