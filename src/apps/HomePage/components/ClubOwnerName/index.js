import React from 'react'
import { connectClubOwnerName } from 'apps/HomePage/connectors'
import './styles.scss'

function ClubOwnerName({ clubOwner }) {
    return (
        clubOwner
            ? (
                <div className="ClubOwnerName">
                    Руководитель клуба: <span>{clubOwner}</span>
                </div>
            )
            : null
    )
}


export default connectClubOwnerName(ClubOwnerName)