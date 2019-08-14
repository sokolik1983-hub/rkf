import React from 'react'
import ClubHeaderPicture from '../HeaderPicture'
import ClubLogoPicture from '../LogoPicture'
import {connectClientClubHeader} from 'apps/ClientClub/connectors'
import './styles.scss'

function ClientClubHeader({
                              headliner_link = "/static/images/header/clientDefaultBanner.jpeg",
                              logo_link,
                              name = "Имя не задано"
                          }) {
    return (
        <div className="ClientClubHeader">
            <ClubHeaderPicture/>
            <div className="ClientClubHeader__footer">
                <div className="ClientClubHeader__info">
                    <ClubLogoPicture/>
                    <h3>{name}</h3>
                </div>
            </div>
        </div>
    )
}

export default connectClientClubHeader(ClientClubHeader)