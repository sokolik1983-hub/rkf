import React from "react"
import ClubAlias from './components/Alias'
import UpdateClubInfoForm from './components/Form'
import LogoPicture from './components/LogoPicture'

function ClientClubInfo({bindSubmitClubAlias, bindSubmitClubLogo, bindSubmitClubInfo}) {
    return (
        <div>
            <ClubAlias bindSubmitForm={bindSubmitClubAlias}/>
            <div style={{alignItems: 'flex-start'}} className="flex-row">
                <LogoPicture bindSubmitForm={bindSubmitClubLogo}/>
                <UpdateClubInfoForm bindSubmitForm={bindSubmitClubInfo}/>
            </div>
        </div>
    )
}


export default ClientClubInfo