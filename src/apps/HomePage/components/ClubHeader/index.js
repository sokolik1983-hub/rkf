import React from 'react'
import { connectClubHeader } from 'apps/HomePage/connectors'
import AuthVisible from 'apps/Auth/containers/AuthVisible'
import { Link } from 'react-router-dom'
import ClubPicture from './Picture'
import ClubLogo from './Logo'
import './styles.scss'


function ClubHeader(props) {
    const {
        clubLogo,
        clubHeaderImg,
        clubName,
        clubId,
        profileId
    } = props;
    return (
        <div className="ClubHeader">
            {clubHeaderImg && <ClubPicture picture={clubHeaderImg} />}
            <div className="ClubHeader__footer">
                <div className="ClubHeader__info">
                    <ClubLogo logo={clubLogo} />
                    <h3>{clubName}</h3>
                </div>
                {
                    clubId === profileId
                        ? <AuthVisible>
                            <Link className="btn btn-primary" to="/client">Редактировать профиль</Link>
                        </AuthVisible>
                        : null
                }
            </div>
        </div>
    )
}

export default React.memo(
    connectClubHeader(ClubHeader)
)
