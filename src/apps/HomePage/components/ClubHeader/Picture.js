import React from 'react'
import './Picture.scss'

function ClubHeaderPicture({ picture }) {
    return (
        picture
            ? <div style={{ backgroundImage: `url(${picture})` }} className="ClubHeaderPicture"></div>
            : <div style={{ backgroundImage: `url(/static/images/header/clientDefaultBanner.jpeg)` }} className="ClubHeaderPicture"></div>
    )
}

export default React.memo(ClubHeaderPicture)