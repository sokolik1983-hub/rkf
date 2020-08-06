import React from "react";
import "./index.scss";


const WikiHelp = ({url, title}) => (
    // eslint-disable-next-line
    <a href={url} title={title} className="wiki-help" target="_blank" rel="noopener noreferrer" />
);

export default WikiHelp;