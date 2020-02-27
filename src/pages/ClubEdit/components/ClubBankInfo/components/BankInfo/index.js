import React from 'react'
import {connectBankInfo} from 'apps/ClubBankInfo/connectors'
import {DirObject} from 'components/DirObject'
function BankInfo({clubBankInfo}) {

    return (
        <div id={`BankInfo_`} className="BankInfo">
            <DirObject object={clubBankInfo} className={'BankInfo'}/>
        </div>
    )
}

export default connectBankInfo(BankInfo)