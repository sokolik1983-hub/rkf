import React from 'react';
import Card from '../../../../components/Card';
import ClubSchedule from '../ClubSchedule';
import EditPageButtons from '../EditPageButtons';

const ClubScheduleCard = ({
        bindSubmitClubSchedule,
        handleSubmitForms,
        work_time,
        club_id,
}) => {

    return (
        <Card className="Schedule">
            <ClubSchedule
                club_id={club_id}
                work_time={work_time}
                bindSubmitForm={bindSubmitClubSchedule}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubScheduleCard;
