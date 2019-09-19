import React from 'react'
import './Picture.scss'

function ClubHeaderPicture({picture = '/static/images/header/clientDefaultBanner.jpeg'}){
    return(
        <div style={
            {backgroundImage:`url(${picture})`}
        } className="ClubHeaderPicture">
        </div>
    )
}

export default React.memo(ClubHeaderPicture)