import React from 'react'
import {connectClubAddress} from 'apps/HomePage/connectors'
import './styles.scss'

function ClubAddress({address, city}) {
    return (
        <div className="ClubAddress">Адрес: <span>{city && city.name}, {address}</span></div>
    )
}

export default connectClubAddress(ClubAddress)