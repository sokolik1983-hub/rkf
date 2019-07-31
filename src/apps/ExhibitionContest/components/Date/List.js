import React from 'react'
import ContestDate from "./index";
import {connectContestDateList} from "apps/ClientExhibitionContest/connectors";

function ContestDateList({dateIds}) {
    return (
        <div className="ContestDateList">
            {
                dateIds.map((id, index) =>
                    <ContestDate index={index} key={id} dayId={id}/>
                )
            }
        </div>)

}

export default connectContestDateList(ContestDateList)