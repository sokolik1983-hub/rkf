import React from 'react'
import { connectClubAddress } from 'apps/HomePage/connectors'
import './styles.scss'

function ClubAddress({ address, city }) {
    return (
        address
            ? <div className="ClubAddress">Адрес: <span>{city && city.name}, {address}</span></div>
            : null
    )
}

export default connectClubAddress(ClubAddress)