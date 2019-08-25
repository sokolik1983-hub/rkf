import React from 'react'
import './Logo.scss'

function ClubHeaderLogo({logo}) {
    return (
        <div style={
            {backgroundImage: `url(${logo})`}
        } className="ClubHeaderLogo">
        </div>
    )
}

export default React.memo(ClubHeaderLogo)