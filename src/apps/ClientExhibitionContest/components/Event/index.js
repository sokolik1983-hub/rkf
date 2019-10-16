import React from 'react'
import {timeSecondsCutter} from "utils/datetime";
import './styles.scss'

export default function ContestEvent({time_start, time_end, name}) {
    return (
        <p className="ContestEvent">
            <span className="ContestEvent__time">
                {`${timeSecondsCutter(time_start)} - ${timeSecondsCutter(time_end)}`}
            </span>
            <span className="ContestEvent__title">{name}</span>
        </p>
    )
}