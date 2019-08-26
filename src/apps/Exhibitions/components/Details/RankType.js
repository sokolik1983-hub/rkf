import React from 'react'
import {getDictElement, useDictionary} from "apps/Dictionaries";

export default function ExhibitionRankType({rank_types}) {
    const {dictionary} = useDictionary('rank_type');

    const data = rank_types ? rank_types.map(rt => getDictElement(dictionary, rt)) : []
    return data ?
        data.map(type =>
            <div key={type} className="ExhibitionRankType">{type}</div>
        )
        : null

}