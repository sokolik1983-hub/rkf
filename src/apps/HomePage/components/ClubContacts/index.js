import React, { Fragment } from 'react';
import { CONTACT_TYPES } from 'apps/ClubContacts/config';
import { connectClubContacts } from 'apps/HomePage/connectors';
import ClubContact from './Contact';


import './styles.scss';

function ClubContacts({ contacts }) {
    const prepareContacts = () => {
        const emails = contacts.filter(
            contact =>
                String(contact.contact_type_id) === CONTACT_TYPES.email.value
        );
        const phones = contacts.filter(
            contact =>
                String(contact.contact_type_id) === CONTACT_TYPES.phone.value
        );
        return { emails, phones };
    };

    const { emails, phones } = prepareContacts();
    return (
        <Fragment>
            <div className="ClubContacts ClubContacts--emails">
                {emails &&
                    emails.map(contact => (
                        <ClubContact key={contact.id} {...contact} />
                    ))}
            </div>
            <div className="ClubContacts ClubContacts--phones">
                {phones &&
                    phones.map(contact => (
                        <ClubContact key={contact.id} {...contact} />
                    ))}
            </div>
        </Fragment>
    );
}

export default connectClubContacts(ClubContacts);
