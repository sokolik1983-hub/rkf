import React, {useEffect, useState} from 'react';
import ClubInfo from '../ClubInfo';
import ClubDocuments from '../ClubDocuments';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';
import {withRouter} from "react-router-dom";
import UploadDocsEditPage from "../../../../components/UploadDocsEditPage/UploadDocsEditPage";

const ClubMain = ({
        club_alias,
        is_federation,
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubAlias,
        bindSubmitClubDocuments,
        history
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
            <UploadDocsEditPage
                clubAlias={club_alias}
                history={history}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />

        </Card>
    );
};

export default withRouter(ClubMain);
