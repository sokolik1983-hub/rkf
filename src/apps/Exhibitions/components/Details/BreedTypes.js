import React from 'react'
import {getDictElementsArray, useDictionary} from "apps/Dictionaries";

export default function ExhibitionBreedTypes({breedTypesIds = []}) {
    const {dictionary} = useDictionary('breed_types');
    const breedTypes = getDictElementsArray(dictionary, breedTypesIds);
    return (
        <React.Fragment>
            {breedTypes.map(breedType => <div key={breedType} className="ExhibitionBreedTypes">{breedType}</div>)}
        </React.Fragment>
    )
}