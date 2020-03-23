import React from "react";
import {connectBankInfo} from "../../connectors";
import {DirObject} from "../../../../../../components/DirObject";


const BankInfo = ({clubBankInfo}) => (
    <div id={`BankInfo_`} className="BankInfo">
        <DirObject object={clubBankInfo} className={'BankInfo'}/>
    </div>
);

export default connectBankInfo(React.memo(BankInfo));