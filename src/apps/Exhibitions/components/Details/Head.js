import React from 'react';
import { Link } from "react-router-dom";

export default function ExhibitionDetails__head({ name, club_information }) {
    const {club_fact_name, club_alias} = club_information;

    return (
        <div className="ExhibitionDetails__head">
            <h1>{name}</h1>
            <div className="exhibition-details__signature--top">
                Организатор: <Link to={`/${club_alias}`} >{club_fact_name}</Link>
            </div>
        </div>
    )
}