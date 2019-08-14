import React from 'react'

const types = {
    "1": 'Телефон',
    "2": 'Email',
};

export default function ClubListContact({description, value, contact_type_id}) {

    return (
        <div className="ClintClubContact">
            <div className="ClintClubContact__type">{types[String(contact_type_id)]}</div>
            <div className="ClintClubContact__description">{description}</div>
            <div className="ClintClubContact__value">{value}</div>
        </div>
    )
};