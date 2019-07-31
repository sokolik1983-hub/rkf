import React from 'react'
import {getDictElement, useDictionary} from "apps/Dictionaries";

export default function ExhibitionRankType({rank_type}) {
    const {dictionary} = useDictionary('rank_type');
    const rank = getDictElement(dictionary, rank_type);
    console.log(dictionary, rank_type)
    return (
        <div key={rank_type} className="ExhibitionRankType">{rank}</div>
    )
}