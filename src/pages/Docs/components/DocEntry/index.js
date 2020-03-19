import React from "react";
import Card from "components/Card";
import "./index.scss";

export default ({ doctype, status, date }) =>
    <Card className="DocEntry">
        <h3>{doctype}</h3>
        <div className="DocEntry__status">
            <i className="DocEntry__success">{status}</i>
            <b>{date}</b>
        </div>
    </Card>
