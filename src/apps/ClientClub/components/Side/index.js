import React from 'react'
import ClientClubContacts from '../Contacts'
import Card from 'components/Card'
import ClientClubDocuments from 'apps/ClubDocuments'


export default function Side({children}) {
    return (
        <div className="ClientHome__sidebar">
            <Card>
                <ClientClubContacts/>
                <ClientClubDocuments/>
                {children}
            </Card>
        </div>)
};