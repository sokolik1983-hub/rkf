import React, {useRef} from 'react'
import {connectPublicClubHeaderPicture} from 'apps/PublicClub/connectors'
import './styles.scss'

function ClubHeaderPicture({backgroundImage}) {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
            className="ClubHeaderPicture"
        />

    )
}

ClubHeaderPicture.defaultProps = {
    backgroundImage: "/static/images/header/clientDefaultBanner.jpeg"
};

export default connectPublicClubHeaderPicture(ClubHeaderPicture)