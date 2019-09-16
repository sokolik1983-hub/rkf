import React from 'react'
import Card from 'components/Card'
import { connectClubDescription } from 'apps/HomePage/connectors'

function ClubDescription({ description }) {
    return (
        <Card className="ClubDescription">
            <h4 className="text-upper">Описание</h4>
            {description}
        </Card>
    )
}

export default connectClubDescription(ClubDescription);