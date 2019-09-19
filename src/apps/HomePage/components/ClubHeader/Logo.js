import React from 'react'
import './Logo.scss'

const DEFAULT_LOGO = '/static/icons/default/club-avatar.svg';

function ClubHeaderLogo({logo}) {
    return (
        <div style={
            {backgroundImage: `url(${logo ? logo : DEFAULT_LOGO})`}
        } className="ClubHeaderLogo">
        </div>
    )
}

export default React.memo(ClubHeaderLogo)