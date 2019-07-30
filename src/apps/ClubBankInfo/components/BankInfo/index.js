import React from 'react'
import {connectBankInfo} from 'apps/ClubBankInfo/connectors'
import {DirObject} from 'components/DirObject'
function BankInfo({clubBankInfo}) {
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
    // } = clubBankInfo;
    return (
        <div id={`BankInfo_`} className="BankInfo">
            <DirObject object={clubBankInfo} className={'BankInfo'}/>
        </div>
    )
}

export default connectBankInfo(BankInfo)