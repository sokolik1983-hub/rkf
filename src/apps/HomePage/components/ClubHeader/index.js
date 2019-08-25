import React from 'react'
import {connectClubHeader} from 'apps/HomePage/connectors'
import ClubPicture from './Picture'
import ClubLogo from './Logo'
import './styles.scss'

function ClubHeader(props) {
    const {
        clubLogo,
        clubHeaderImg,
        clubName
    } = props;
    return (
        <div className="ClubHeader">
            <ClubPicture picture={clubHeaderImg}/>
            <div className="ClubHeader__footer">
                <div className="ClubHeader__info">
                    <ClubLogo logo={clubLogo}/>
                    <h3>{clubName}</h3>
                </div>
            </div>
        </div>
    )
}

export default React.memo(
    connectClubHeader(ClubHeader)
)
