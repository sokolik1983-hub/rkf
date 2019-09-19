import React from 'react'
import './Picture.scss'

function ClubHeaderPicture({ picture }) {
    return (
        picture
            ? <div style={{ backgroundImage: `url(${picture})` }} className="ClubHeaderPicture"></div>
            : <div style={{ background: 'url(/static/images/header/clientDefaultBanner.jpeg) center -20px/cover no-repeat' }} className="ClubHeaderPicture"></div>
    )
}

export default React.memo(ClubHeaderPicture)