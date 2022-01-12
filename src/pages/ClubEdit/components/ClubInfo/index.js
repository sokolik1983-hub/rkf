import React from "react";
import ClubAlias from "./components/Alias";
import UpdateClubInfoForm from "./components/Form";
import "./styles.scss";

const ClientClubInfo = ({
                            bindSubmitClubAlias,
                            bindSubmitClubInfo,
                            isFederation
}) => (
    <div>
        {!isFederation && <ClubAlias bindSubmitForm={bindSubmitClubAlias} />}
        <div style={{alignItems: 'flex-start'}} className="flex-row ClientClubInfo">
            <UpdateClubInfoForm bindSubmitForm={bindSubmitClubInfo} />
        </div>
    </div>
);

export default React.memo(ClientClubInfo);