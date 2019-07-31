import React from 'react'
import {formatDateWithLocaleString, transformDate} from "utils/datetime";
import DateEvents from "../Event/List";
import {connectContestDate} from 'apps/ClientExhibitionContest/connectors'


function ContestDate({dayId, day, index}) {

    const date = transformDate(day);

    return (
        <div id={'ContestDate' + dayId} className="ContestDate">
            <div className="ContestDate__date">
                <div className="ContestDate__date">
                    <span className="ContestDate__span">{index + 1} день</span>
                    <br/>
                    {formatDateWithLocaleString(date)}
                </div>
            </div>
            <DateEvents day={dayId} items={day.items}/>
        </div>
    )
}

export default connectContestDate(ContestDate)