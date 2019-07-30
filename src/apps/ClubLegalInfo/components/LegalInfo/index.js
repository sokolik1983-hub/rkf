import React from 'react'
import {connectLegalInfo} from 'apps/ClubLegalInfo/connectors'
import {DirObject} from 'components/DirObject'
function LegalInfo({clubLegalInfo}) {
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
    // } = clubLegalInfo;
    return (
        <div id={`LegalInfo_`} className="LegalInfo">
            <DirObject object={clubLegalInfo} className={'LegalInfo'}/>
        </div>
    )
}

export default connectLegalInfo(LegalInfo)