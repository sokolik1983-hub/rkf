import React from 'react'
import PublicClubContacts from '../Contacts'
import Card from 'components/Card'
import PublicClubDocuments from '../Documents'

export default function Side({children}) {
    return (
        <div className="ClientHome__sidebar">
            <Card>
                <PublicClubContacts/>
                <PublicClubDocuments/>
            </Card>
        </div>)
};