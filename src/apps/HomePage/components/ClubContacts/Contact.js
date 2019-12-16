import React from 'react';
import classnames from 'classnames';
import { CONTACT_TYPES } from 'apps/ClubContacts/config';
import './Contact.scss';

export default function ClubContact({ description, value, contact_type_id }) {
    return (
        <div
            className={classnames(
                'ClubContact',
                `ClubContact--${contact_type_id}`
            )}
        >
            <div className="ClubContact__description"> {description}</div>
            <div className="ClubContact__value">
                {
                    String(contact_type_id) === CONTACT_TYPES.email.value
                        ? <a href={`mailto:${value}`}>{value}</a>
                        : <span>{value}</span>
                }
            </div>
        </div>
    );
}
