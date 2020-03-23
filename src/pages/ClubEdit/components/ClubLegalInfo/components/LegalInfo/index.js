import React from "react";
import {connectLegalInfo} from "../../connectors";
import {DirObject} from "../../../../../../components/DirObject";


const LegalInfo = ({clubLegalInfo}) => (
    <div id={`LegalInfo_`} className="LegalInfo">
        <DirObject object={clubLegalInfo} className={'LegalInfo'}/>
    </div>
);

export default connectLegalInfo(React.memo(LegalInfo));