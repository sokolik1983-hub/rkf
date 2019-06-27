import React from 'react'
import {formatDateWithLocaleString, transformDate} from "utils/datetime";
import DateEvents from "../Event/List";
import {connectScheduleDate} from 'apps/ClientExhibitionSchedule/connectors'

function ScheduleDate({dayId, day, index}) {
    const date = transformDate(day);
    return (
        <div id={'day' + dayId} className="day">
            <div className="day__date">
                <div className="day__date">
                    <span className="day__span">{index + 1} день</span>
                    <br/>
                    {formatDateWithLocaleString(date)}
                </div>
            </div>
            <DateEvents day={dayId} items={day.items}/>
        </div>
    )
}

export default connectScheduleDate(ScheduleDate)