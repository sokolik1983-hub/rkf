import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
import './Header.scss'

export default function ClientHomeHeader({
                                             banner = "/static/images/header/clientDefaultBanner.jpeg",
                                         }) {
    return (
        <div className="ClientHomeHeader">
            <div style={{backgroundImage: `url(${banner})`}} className="ClientHomeHeader__banner"/>
            <div className="ClientHomeHeader__footer">
                <div className="ClientHomeHeader__info">
                    <ClientAvatar className="ClientHomeHeader__logo"/>
                    <h3>Кинологический клуб<br/>DoggyDog</h3>
                </div>
                <div className="ClientHomeHeader__controls">
                    <button>Подписаться</button>
                </div>
            </div>
        </div>
    )
}