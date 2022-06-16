import React from "react";
import "./index.scss";
import {Link} from "react-router-dom";

export default ({ name, value, email }) =>
    <p className="PropertyP">
        <span className="PropertyP__name">{name}: </span>
        {email &&
            <Link to={`mailto:${value}`}><span className="PropertyP__value">{value}</span></Link>
        }
        {!email &&
            <span className="PropertyP__value">{value}</span>
        }
    </p>
