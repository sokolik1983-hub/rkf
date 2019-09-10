import React from 'react'
import { getDictElementsArray, useDictionary } from "apps/Dictionaries";

export default function ExhibitionClassTypes({ classTypesIds = [] }) {
    const { dictionary } = useDictionary('class_types');
    const classTypes = getDictElementsArray(dictionary, classTypesIds);
    return (
        <React.Fragment>
            {classTypes.map((classType, i) => <span key={classType} className="ExhibitionClassTypes">{i === 0 ? classType : `, ${classType}`}</span>)}
        </React.Fragment>
    )
}