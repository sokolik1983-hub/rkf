import React from 'react'
import {connectExhibitionsAnnouncement} from 'apps/HomePage/connectors'

 function ExhibitionAnnouncement({image, exhibition_name, preview_text}){
    return(
        <div className="ExhibitionAnnouncement">
        <div style={{backgroundImage: `url(${image})`}} className="ExhibitionAnnouncement__image"/>
        <div className="ExhibitionAnnouncement__title">{exhibition_name}</div>
        <div className="ExhibitionAnnouncement__preview-text">{preview_text}</div>
    </div>
    )
}

export default connectExhibitionsAnnouncement(ExhibitionAnnouncement)