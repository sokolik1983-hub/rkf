import React from 'react'
import ScheduleDate from "./index";
import {connectScheduleDateList} from "apps/ExhibitionSchedule/connectors";

function ScheduleDateList({dateIds}) {


    return (
        <div className="ScheduleDate__list">
            {
                dateIds.map((id, index) =>
                    <ScheduleDate index={index} key={id} dateId={id}/>
                )
            }
        </div>
    )
}

export default connectScheduleDateList(ScheduleDateList)