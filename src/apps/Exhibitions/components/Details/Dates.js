import React from 'react'
import { transformDate, getLocalizedWeekDay } from "utils/datetime";


function Date({ day, month, year, time_start, time_end }) {
    const date = transformDate({ day, month, year });

    return (
        <div
            className={`ExhibitionDetailsDates__datetime`}>
            {`${getLocalizedWeekDay(date)}, ${day}.${month}.${year}`}
        </div>
    )
}

export default function ExhibitionDetailsDates({ dates }) {
    return (
        <div>{
            dates ?
                dates.map((date, index) => <Date key={index}{...date} />)
                : null
        }</div>
    )
}