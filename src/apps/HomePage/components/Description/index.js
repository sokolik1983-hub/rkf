import React from 'react'
import Card from 'components/Card'
import {connectClubDescription} from 'apps/HomePage/connectors'

function ClubDescription({description}) {
    return (
        <Card className="ClubDescription">{description}</Card>
    )
}

export default connectClubDescription(ClubDescription);