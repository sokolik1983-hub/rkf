import React from 'react'
import classnames from 'classnames'
import './Contact.scss'

export default function ClubContact({description, value, contact_type_id}) {
    return (
        <div className={classnames('ClubContact', `ClubContact--${contact_type_id}`)}>
            <div className="ClubContact__description">{description}:</div>
            <div className="ClubContact__value">{value}</div>
        </div>
    )
}