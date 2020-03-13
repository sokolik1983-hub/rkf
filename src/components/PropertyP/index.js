import React from "react";
import "./index.scss";

export default ({ name, value }) =>
    <p>
        <span className="PropertyP__name">{name}: </span>
        <span className="PropertyP__value">{value}</span>
    </p>;
