import React from "react"
import ClubAlias from './components/Alias'
import UpdateClubInfoForm from './components/Form'
import LogoPicture from './components/LogoPicture'

function ClientClubInfo() {
    return (
        <div>
            <ClubAlias/>
            <div style={{alignItems: 'flex-start'}} className="flex-row">
                <LogoPicture/><UpdateClubInfoForm/>
            </div>
        </div>
    )
}


export default ClientClubInfo