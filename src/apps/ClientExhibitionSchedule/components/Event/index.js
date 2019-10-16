import React from 'react'
import {timeSecondsCutter} from "utils/datetime";
import './styles.scss'

export default function ScheduleEvent({time_start, time_end, name}) {
    return (
        <p className="ScheduleEvent">
            <span className="ScheduleEvent__time">
                {`${timeSecondsCutter(time_start)} - ${timeSecondsCutter(time_end)}`}
            </span>
            <span className="ScheduleEvent__title">{name}</span>
        </p>
    )
}