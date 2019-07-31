import React from 'react'
import Button from "components/Button";
import CountDown from "components/CountDown";

import ExhibitionCity from './City'
import ExhibitionRankType from './RankType'
import ExhibitionClassTypes from './ClassTypes'
import ExhibitionBreedTypes from './BreedTypes'
import ExhibitionDignityTypes from './DignityTypes'


export default function ExhibitionAsideContent({class_types, rank_type, breed_types, dignity_types, city_id}) {

    return (
        <div>
            <div className="ExhibitionDetails__aside_holder">
                <div className="ExhibitionDetails__short_info">
                    <div
                        className="ExhibitionDetails__dates-icon">dates
                    </div>
                    <div className="ExhibitionDetails__time-icon">Начало time</div>
                    <div
                        className="ExhibitionDetails__place-icon"><ExhibitionCity cityId={city_id}/></div>
                </div>
            </div>
            <table className="ExhibitionDetails__attrs-table">
                <tbody>
                <tr>
                    <td>Класс:</td>
                    <td><ExhibitionClassTypes classTypesIds={class_types}/></td>
                </tr>
                <tr>
                    <td>Титул:</td>
                    <td><ExhibitionDignityTypes dignityTypesIds={dignity_types}/></td>
                </tr>
                <tr>
                    <td>Ранг:</td>
                    <td><ExhibitionRankType rank_type={rank_type}/></td>
                </tr>
                <tr>
                    <td>Породы:</td>
                    <td><ExhibitionBreedTypes breedTypesIds={breed_types}/></td>
                </tr>
                </tbody>
            </table>
            <div className="ExhibitionDetails__controls">
                <Button className="btn-primary">Участвовать</Button>
                <Button className="btn-secondary">В избранное</Button>
                <Button className="btn-secondary">Поделиться</Button>
            </div>
            <CountDown/>
        </div>
    )
}