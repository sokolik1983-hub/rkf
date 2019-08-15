import React from "react"
import ClubAlias from './components/Alias'
import UpdateClubInfoForm from './components/Form'
import ClubHeaderPicture from './components/HeaderPicture'
import LogoPicture from './components/LogoPicture'

function ClientClubInfo() {
    return (
        <div>
            <ClubHeaderPicture/>
            <div style={{alignItems: 'flex-start', justifyContent: 'space-evenly'}} className="flex-row">
                <LogoPicture/>
                <ClubAlias/>
            </div>
            <UpdateClubInfoForm/>
        </div>
    )
}


export default ClientClubInfo