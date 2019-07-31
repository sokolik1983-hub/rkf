import React from 'react'
import {getDictElement, useDictionary} from "apps/Dictionaries";

export default function ExhibitionCity({cityId}) {
    const {dictionary} = useDictionary('cities');
    const city = getDictElement(dictionary, cityId);
    return (
        <div className="ExhibitionCity">{city}</div>
    )
}