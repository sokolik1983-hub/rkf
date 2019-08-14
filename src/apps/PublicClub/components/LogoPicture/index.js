import React from 'react'
import {connectPublicClubLogoPicture} from 'apps/PublicClub/connectors'
import './styles.scss'

function ClubLogoPicture({backgroundImage}) {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
            className="ClubLogoPicture"
        />
    )
}

ClubLogoPicture.defaultProps = {
    backgroundImage: '/static/images/noimg/no-avatar.png'
};

export default connectPublicClubLogoPicture(ClubLogoPicture)