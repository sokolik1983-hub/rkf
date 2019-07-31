import React from 'react'
import {timeSecondsCutter} from "utils/datetime";
import './styles.scss'

export default function ScheduleEvent({time_start, time_end, name}) {
    return (
        <div className="ScheduleEvent">
            <div className="ScheduleEvent__start">{timeSecondsCutter(time_start)}</div>
            <div className="ScheduleEvent__end">{timeSecondsCutter(time_end)}</div>
            <div className="ScheduleEvent__title">{name}</div>
        </div>
    )
}