import React from 'react'
import {getDictElementsArray, useDictionary} from "apps/Dictionaries";

export default function ExhibitionDignityTypes({dignityTypesIds = []}) {
    const {dictionary} = useDictionary('dignity_types');
    const dignityTypes = getDictElementsArray(dictionary, dignityTypesIds);
    return (
        <React.Fragment>
            {dignityTypes.map(dignityType => <div key={dignityType} className="ExhibitionDignityTypes">{dignityType}</div>)}
        </React.Fragment>
    )
}