import React from 'react';
import ClubAlias from './components/Alias';
import UpdateClubInfoForm from './components/Form';

import './styles.scss';


const ClientClubInfo = ({
        bindSubmitClubAlias,
        bindSubmitClubInfo,
        isFederation,
        club_alias,
}) => (
    <div className="ClientClubInfo__wrap">
        {!isFederation && <ClubAlias bindSubmitForm={bindSubmitClubAlias} club_alias={club_alias} />}
        <div className="ClientClubInfo">
            <UpdateClubInfoForm
                bindSubmitForm={bindSubmitClubInfo}
                isFederation={isFederation}
            />
        </div>
    </div>
);

export default React.memo(ClientClubInfo);