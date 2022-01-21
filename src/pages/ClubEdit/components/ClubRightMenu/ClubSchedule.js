import React from 'react';
import ClubSchedule from '../ClubSchedule';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';

const ClubScheduleCard = ({
        bindSubmitClubSchedule,
        handleSubmitForms,
}) => {

    return (
        <Card className="Schedule">
            <ClubSchedule
                bindSubmitForm={bindSubmitClubSchedule}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubScheduleCard;
