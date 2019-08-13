import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
import {connectClientClubHeader} from 'apps/ClientClub/connectors'
import './styles.scss'

function ClientClubHeader({
                              headliner_link = "/static/images/header/clientDefaultBanner.jpeg",
                              logo_link,
                              name = "Имя не задано"
                          }) {
    return (
        <div className="ClientClubHeader">
            <div style={{backgroundImage: `url(${headliner_link})`}} className="ClientClubHeader__banner"/>
            <div className="ClientClubHeader__footer">
                <div className="ClientClubHeader__info">
                    <ClientAvatar avatar={logo_link} className="ClientClubHeader__logo"/>
                    <h3>{name}</h3>
                </div>
            </div>
        </div>
    )
}

export default connectClientClubHeader(ClientClubHeader)