import React from 'react'
import ClubHeaderPicture from '../HeaderPicture'
import ClubLogoPicture from '../LogoPicture'
import {connectPublicClubHeader} from 'apps/PublicClub/connectors'
import './styles.scss'

function PublicClubHeader({
                              headliner_link = "/static/images/header/clientDefaultBanner.jpeg",
                              logo_link,
                              name = "Имя не задано"
                          }) {
    return (
        <div className="PublicClubHeader">
            <ClubHeaderPicture/>
            <div className="PublicClubHeader__footer">
                <div className="PublicClubHeader__info">
                    <ClubLogoPicture/>
                    <h3>{name}</h3>
                </div>
            </div>
        </div>
    )
}

export default connectPublicClubHeader(PublicClubHeader)