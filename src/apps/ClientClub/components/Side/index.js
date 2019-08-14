import React from 'react'
import ClientClubContacts from '../Contacts'
import Card from 'components/Card'
import ClientClubDocuments from 'apps/ClubDocuments'
import ClientClubAlias from '../Alias'

export default function Side({children}) {
    return (
        <div className="ClientHome__sidebar">
            <Card>
                <ClientClubContacts/>
                <ClientClubDocuments/>
                <ClientClubAlias/>
                {children}
            </Card>
        </div>)
};