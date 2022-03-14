import React from 'react';
import Card from '../../../../components/Card';
import ClubSchedule from '../ClubSchedule';
import EditPageButtons from '../EditPageButtons';

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
