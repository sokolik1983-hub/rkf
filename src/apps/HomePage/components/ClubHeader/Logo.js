import React from 'react'
import './Logo.scss'
import { DEFAULT_IMG } from 'appConfig';

function ClubHeaderLogo({logo}) {
    return (
        <div style={
            {backgroundImage: `url(${logo ? logo : DEFAULT_IMG.clubAvatar})`}
        } className="ClubHeaderLogo">
        </div>
    )
}

export default React.memo(ClubHeaderLogo)