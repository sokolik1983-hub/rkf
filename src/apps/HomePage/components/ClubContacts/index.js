import React from 'react'

import ClubContact from './Contact'
import {connectClubContacts} from 'apps/HomePage/connectors'
import './styles.scss'

function ClubContacts({contacts}) {
    return (
        <div className="ClubContacts">
            {contacts && contacts.map(contact=><ClubContact key={contact.id} {...contact}/>)}
        </div>
    )
}


export default connectClubContacts(ClubContacts)