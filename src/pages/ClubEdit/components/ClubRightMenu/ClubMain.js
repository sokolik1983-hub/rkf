import React from 'react';
import ClubInfo from '../ClubInfo';
import ClubDocuments from '../ClubDocuments';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';

const ClubMain = ({
        club_alias,
        is_federation,
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubAlias,
        bindSubmitClubDocuments,
}) => {

    return (
        <Card className="MainInfo">
            <h3>Основная информация</h3>
            <ClubInfo
                bindSubmitClubAlias={bindSubmitClubAlias}
                bindSubmitClubInfo={bindSubmitClubInfo}
                isFederation={is_federation}
                club_alias={club_alias}
            />
            <ClubDocuments
                bindSubmitForm={bindSubmitClubDocuments}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubMain;
