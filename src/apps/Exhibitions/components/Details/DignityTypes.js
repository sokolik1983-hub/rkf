import React from 'react'
import {getDictElement, useDictionary} from "apps/Dictionaries";

export default function ExhibitionDignityTypes({type_id}) {
    const {dictionary} = useDictionary('dignity_types');
    const type = getDictElement(dictionary, type_id);
    return (
        <React.Fragment>
            {type}
        </React.Fragment>
    )
}