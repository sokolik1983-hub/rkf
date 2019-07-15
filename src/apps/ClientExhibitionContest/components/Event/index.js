import React from 'react'
import {timeSecondsCutter} from "utils/datetime";
import './styles.scss'

export default function ContestEvent({time_start, time_end, name}) {
    return (
        <div className="ContestEvent">
            <div className="ContestEvent__start">{timeSecondsCutter(time_start)}</div>
            <div className="ContestEvent__end">{timeSecondsCutter(time_end)}</div>
            <div className="ContestEvent__title">{name}</div>
        </div>
    )
}