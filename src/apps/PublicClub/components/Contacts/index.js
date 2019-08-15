import React from 'react'
import {connectPublicClubContacts} from 'apps/PublicClub/connectors'
import Contact from './Contact'
import './styles.scss'

function PublicClubContacts({contacts}) {
    return (
        <div className="PublicClubContacts">
            <h3>Контакты</h3>
            {contacts.map(contact => <Contact key={contact.id} {...contact}/>)}
        </div>
    )
}

export default connectPublicClubContacts(PublicClubContacts)