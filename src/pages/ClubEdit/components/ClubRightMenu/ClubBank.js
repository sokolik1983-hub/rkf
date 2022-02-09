import React from 'react';
import Card from '../../../../components/Card';
import ClubBankInfo from '../ClubBankInfo';
import EditPageButtons from '../EditPageButtons';

const ClubBank = ({
        bindSubmitClubBankInfo,
        handleSubmitForms,
        handleSuccess,
}) => {

    return (
        <Card className="BankInfo">
            <ClubBankInfo
                bindSubmitForm={bindSubmitClubBankInfo}
            />
            <EditPageButtons
                handleSuccess={handleSuccess}
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubBank;
