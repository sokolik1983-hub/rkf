import React from "react";
import ClubAlias from './components/Alias';
import UpdateClubInfoForm from './components/Form';
import LogoPicture from './components/LogoPicture';
import './styles.scss';

function ClientClubInfo({ bindSubmitClubAlias, bindSubmitClubLogo, bindSubmitClubInfo, isFederation }) {
    return (
        <div>
            {!isFederation && <ClubAlias bindSubmitForm={bindSubmitClubAlias} />}
            <div style={{ alignItems: 'flex-start' }} className="flex-row ClientClubInfo">
                <LogoPicture bindSubmitForm={bindSubmitClubLogo} />
                <UpdateClubInfoForm bindSubmitForm={bindSubmitClubInfo} />
            </div>
        </div>
    )
}


export default ClientClubInfo