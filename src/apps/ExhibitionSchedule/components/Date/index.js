import React from 'react'
import {formatDateWithLocaleString, transformDate} from "utils/datetime";
import DateEvents from "../Event/List";
import {connectScheduleDate} from 'apps/ExhibitionSchedule/connectors'


function ScheduleDate({dateId, date, index}) {
    const scheduleDate = transformDate(date);
    return (
        <div id={'date' + dateId} className="ScheduleDate">
            <div className="ScheduleDate__date">
                <div className="ScheduleDate__date">
                    <span className="ScheduleDate__span">{index + 1} день</span>
                    <br/>
                    {formatDateWithLocaleString(scheduleDate)}
                </div>
            </div>
            <DateEvents date={dateId} events={date.items}/>
        </div>
    )
}

export default connectScheduleDate(ScheduleDate)