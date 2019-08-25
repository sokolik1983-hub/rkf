import React from 'react'
import './Picture.scss'

function ClubHeaderPicture({picture}){
    return(
        <div style={
            {backgroundImage:`url(${picture})`}
        } className="ClubHeaderPicture">
        </div>
    )
}

export default React.memo(ClubHeaderPicture)