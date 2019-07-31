import React from 'react'
import {timeSecondsCutter} from "utils/datetime";
import './styles.scss'
import {connectContestEvent} from "apps/ExhibitionContest/connectors";

function ContestEvent({item}) {
    const {breed_id, description, name, time_start, time_end, type}=item;
    return (
        <div className="ContestEvent">
            <div className="ContestEvent__start">{timeSecondsCutter(time_start)}</div>
            <div className="ContestEvent__end">{timeSecondsCutter(time_end)}</div>
            <div className="ContestEvent__title">{name}</div>
        </div>
    )
}
export default connectContestEvent(ContestEvent)