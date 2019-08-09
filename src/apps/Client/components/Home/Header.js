import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
import {connectClubHeader} from 'apps/Client/connectors'
import './Header.scss'

function ClientHomeHeader({
                              avatar_link = "/static/images/header/clientDefaultBanner.jpeg",
                              name = "Имя не задано"
                          }) {
    return (
        <div className="ClientHomeHeader">
            <div style={{backgroundImage: `url(${avatar_link})`}} className="ClientHomeHeader__banner"/>
            <div className="ClientHomeHeader__footer">
                <div className="ClientHomeHeader__info">
                    <ClientAvatar className="ClientHomeHeader__logo"/>
                    <h3>{name}</h3>
                </div>
                <div className="ClientHomeHeader__controls">
                    <button>Подписаться</button>
                </div>
            </div>
        </div>
    )
}

export default connectClubHeader(ClientHomeHeader)