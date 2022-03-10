import React from 'react';
import ClubInfo from '../ClubInfo';
import ClubDocuments from '../ClubDocuments';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';
import {withRouter} from 'react-router-dom';
import UploadDocsEditPage from '../../../../components/UploadDocsEditPage/UploadDocsEditPage';

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
        <Card className="main-info">
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
            <UploadDocsEditPage
                clubAlias={club_alias}
                history={history}
            />
        </Card>
    );
};

export default withRouter(ClubMain);
