import React from 'react'
import {getDictElementsArray, useDictionary} from "apps/Dictionaries";

export default function ExhibitionClassTypes({classTypesIds = []}) {
    const {dictionary} = useDictionary('class_types');
    const classTypes = getDictElementsArray(dictionary, classTypesIds);
    return (
        <React.Fragment>
            {classTypes.map(classType => <div key={classType} className="ExhibitionClassTypes">{classType}</div>)}
        </React.Fragment>
    )
}