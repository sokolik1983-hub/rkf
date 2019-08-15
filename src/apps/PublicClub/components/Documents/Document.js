import React from "react";
import classnames from "classnames";


export default function Document({id, name, url}) {
    return (
        <div id={`ClubDocument_${id}`} className="ClubDocument">
            <a className="ClubDocument__description" href={url} target="_blank">{name}</a>
        </div>
    )
}