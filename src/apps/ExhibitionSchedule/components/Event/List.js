import React from "react";
import Event from "./index";
import {connectScheduleEventsList} from 'apps/ExhibitionSchedule/connectors'

function ScheduleDateEvents({events=[], date}) {

    return (
        <div className="ScheduleDateEvents">
            {
                events.length > 0 ?
                    events.map(event =>
                        <Event
                            key={event.id}
                            {...event}
                        />
                    )
                    : null
            }

        </div>
    )

}

export default connectScheduleEventsList(ScheduleDateEvents)