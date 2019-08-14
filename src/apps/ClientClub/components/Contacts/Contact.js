import React from "react";
import classnames from "classnames";


export default function Contact({description, value, contact_type_id}) {
    return (
        <div className={classnames('ClubContact', `ClubContact--type-${contact_type_id}`)}>
            <span className="ClubContact__description">{description}</span>
            <span className="ClubContact__value">{value}</span>
        </div>
    )
}