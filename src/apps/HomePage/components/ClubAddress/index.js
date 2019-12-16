import React from 'react'
import { connectClubAddress } from 'apps/HomePage/connectors'
import './styles.scss'

function ClubAddress({ address, city }) {
    return (
        city && city.name
            ? <div className="ClubAddress">Адрес<br /><span>{city && city.name}{address ? `, ${address}` : null}</span></div>
            : null
    )
}

export default connectClubAddress(ClubAddress)