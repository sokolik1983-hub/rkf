import React from 'react'
import Card from 'components/Card'
import {connectClientClubDescription} from 'apps/ClientClub/connectors'

function ClientClubDescription({description}) {
    return (
        <Card className="ClientHome__Description">{description}</Card>
    )
}

export default connectClientClubDescription(ClientClubDescription);