import React from 'react'
import './Picture.scss'

function ClubHeaderPicture({ picture }) {
    return (
        picture
            ? <div style={{ backgroundImage: `url(${picture})` }} className="ClubHeaderPicture"></div>
            : null
    )
}

export default React.memo(ClubHeaderPicture)