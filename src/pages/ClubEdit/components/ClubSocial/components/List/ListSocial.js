import React from "react";


const ClubSocial = ({site, description}) => (
    <div className="ClubSocial">
        <div className="ClubSocial__site"><a href={site} target="_blank" rel="noopener noreferrer">{site}</a></div>
        <div className="ClubSocial__description">&nbsp;{description}</div>
    </div>
);

export default React.memo(ClubSocial);