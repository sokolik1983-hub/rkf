import React from 'react'
import {connectLegalInfo} from 'apps/LegalInfo/connectors'
import {DirObject} from 'components/DirObject'
function LegalInfo({clubLegalInfoLegalInfo}) {
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
    // } = clubLegalInfoLegalInfo;
    return (
        <div id={`LegalInfo_`} className="LegalInfo">
            <DirObject object={clubLegalInfoLegalInfo} className={'LegalInfo'}/>
        </div>
    )
}

export default connectLegalInfo(LegalInfo)