import React from 'react'
import {getDictElementsArray, useDictionary} from "apps/Dictionaries";

export default function ExhibitionReferees({refereesIds = []}) {
    const {dictionary} = useDictionary('referees');
    const referees = getDictElementsArray(dictionary, refereesIds);
    return (
        <React.Fragment>
            {referees.map(referee =>
                <div key={referee} className="ExhibitionReferee">{referee}</div>
            )}
        </React.Fragment>
    )
}