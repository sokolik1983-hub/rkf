import React from 'react'
import CountDown from "components/CountDown";

import ExhibitionDetailsDates from './Dates'
import ExhibitionRankType from './RankType'
import ExhibitionClassTypes from './ClassTypes'
import ExhibitionBreedTypes from './BreedTypes'
import ExhibitionDignityTypes from './DignityTypes'

import {getDictElement, useDictionary} from "apps/Dictionaries";

export default function ExhibitionAsideContent(
    {
        class_types,
        rank_types,
        breed_types,
        type_id,
        city_id,
        address,
        dates,
    }
) {
    const {dictionary} = useDictionary('cities');
    const city = getDictElement(dictionary, city_id);

    return (
        <div className="ExhibitionAsideContent">
            <div className="ExhibitionDetails__aside_holder">
                <div className="ExhibitionDetails__short_info">
                    <ExhibitionDetailsDates dates={dates}/>
                    {city ? <div
                        className="ExhibitionDetails__place-icon">г. {city}, {address}</div> : null}
                </div>
            </div>
            <table className="ExhibitionDetails__attrs-table">
                <tbody>
                <tr>
                    <td>Класс:</td>
                    <td><ExhibitionClassTypes classTypesIds={class_types}/></td>
                </tr>
                <tr>
                    <td>Стандарт:</td>
                    <td><ExhibitionDignityTypes type_id={type_id}/></td>
                </tr>
                <tr>
                    <td>Ранг:</td>
                    <td><ExhibitionRankType rank_types={rank_types}/></td>
                </tr>
                <tr>
                    <td>Породы:</td>
                    <td><ExhibitionBreedTypes breedTypesIds={breed_types}/></td>
                </tr>
                </tbody>
            </table>
            {/*<div className="ExhibitionDetails__controls">*/}
            {/*    <Button className="btn-primary">Участвовать</Button>*/}
            {/*    <Button className="btn-secondary">В избранное</Button>*/}
            {/*    <Button className="btn-secondary">Поделиться</Button>*/}
            {/*</div>*/}
            <CountDown/>
        </div>
    )
}