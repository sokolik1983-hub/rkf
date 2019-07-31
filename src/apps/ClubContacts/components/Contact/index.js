import React from 'react'
import {connectClubContacts} from 'apps/ClubContacts/connectors'
import {DirObject} from 'components/DirObject'
function ClubContacts({clubClubContactsClubContacts}) {
    // const {
    //     id,
    //     name,
    //     owner_name,
    //     address,
    //     inn,
    //     kpp,
    //     ogrn,
    //     okpo,
    //     registration_number,
    //     registration_date,
    //     is_public
    // } = clubClubContactsClubContacts;
    return (
        <div id={`ClubContacts_`} className="ClubContacts">
            <DirObject object={clubClubContactsClubContacts} className={'ClubContacts'}/>
        </div>
    )
}

export default connectClubContacts(ClubContacts)