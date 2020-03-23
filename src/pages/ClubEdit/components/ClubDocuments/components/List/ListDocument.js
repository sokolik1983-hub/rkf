import React from "react";


const ClintClubDocument = ({name, url}) => (
    <div className="ClintClubDocument">
        <a href={url} target="__blank">{name}</a>
    </div>
);

export default React.memo(ClintClubDocument);