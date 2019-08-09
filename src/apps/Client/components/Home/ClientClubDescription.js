import React from 'react'
import Card from 'components/Card'
import {connectClubDescription} from 'apps/Client/connectors'

function ClientClubDescription({description}) {
    return (
        <Card className="ClientHome__Description">{description}</Card>
    )
}

export default connectClubDescription(ClientClubDescription);