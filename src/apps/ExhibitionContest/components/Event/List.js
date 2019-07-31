import React from "react";
import Event from "./index";
import {connectContestEventsList} from 'apps/ClientExhibitionContest/connectors'

function ContestDateEvents({items, day}) {
    return (
        <div className="ContestDateEvents">
            {
                items.length > 0 ?
                    items.map(item =>
                        <Event
                            itemId={item}
                            key={item}
                        />
                    )
                    : null
            }

        </div>
    )
}

export default connectContestEventsList(ContestDateEvents)