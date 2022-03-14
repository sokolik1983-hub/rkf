import React from 'react';
import Card from '../../../../components/Card';
import ClubBankInfo from '../ClubBankInfo';
import EditPageButtons from '../EditPageButtons';

const ClubBank = ({
        bindSubmitClubBankInfo,
        handleSubmitForms,
}) => {

    return (
        <Card className="BankInfo">
            <ClubBankInfo
                bindSubmitForm={bindSubmitClubBankInfo}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubBank;
