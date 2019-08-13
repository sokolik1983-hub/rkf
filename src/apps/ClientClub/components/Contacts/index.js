import React from 'react'
import {connectClientClubContacts} from 'apps/ClientClub/connectors'
import Contact from './Contact'

function ClientClubContacts({contacts}) {
    return (
        <div className="ClientClubContacts">
            <h3>Контакты</h3>
            {contacts.map(contact => <Contact key={contact.id} {...contact}/>)}
        </div>
    )
}

export default connectClientClubContacts(ClientClubContacts)