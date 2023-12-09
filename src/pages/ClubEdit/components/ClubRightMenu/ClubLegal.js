import React from 'react';
import ClubLegalInfo from '../ClubLegalInfo';
import Card from '../../../../components/Card';

const ClubLegal = ({
        bindSubmitClubLegalInfo
}) => {

    return (
        <Card className="LegalInfo">
            <ClubLegalInfo
                bindSubmitForm={bindSubmitClubLegalInfo}
            />
            <button
                className="button-save__disable"
                disabled="disabled"
            >
                Сохранить
            </button>
        </Card>
    );
};

export default ClubLegal;
