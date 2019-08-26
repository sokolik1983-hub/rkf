import React from 'react'
import {formatDateWithLocaleStringFull, timeSecondsCutter, transformDate} from "utils/datetime";


function Date({day, month, year, time_start, time_end}) {
    const date = transformDate({day, month, year});

    return (
        <div
            className={`ExhibitionDetailsDates__datetime`}>
            {formatDateWithLocaleStringFull(date)}&nbsp;
            {time_start ? `${timeSecondsCutter(time_start)} - ${timeSecondsCutter(time_end)}` : null}
        </div>
    )
}

export default function ExhibitionDetailsDates({dates}) {
    return (
        <div>{
            dates ?
                dates.map((date, index) => <Date key={index}{...date}/>)
                : null
        }</div>
    )
}