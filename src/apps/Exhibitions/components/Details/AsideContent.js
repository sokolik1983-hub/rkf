import React from 'react'
import CountDown from "components/CountDown";

import ExhibitionDetailsDates from './Dates'
import ExhibitionRankType from './RankType'
import ExhibitionClassTypes from './ClassTypes'
import ExhibitionBreedTypes from './BreedTypes'
import { transformDateSafariFriendly, timeSecondsCutter } from "utils/datetime";
import { getDictElement, useDictionary } from "apps/Dictionaries";

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
    const { dictionary } = useDictionary('cities');
    const city = getDictElement(dictionary, city_id);
    const timeStart = dates && dates[0].time_start;

    return (
        <div className="ExhibitionAsideContent">
            <div className="ExhibitionDetails__aside_holder">
                <div className="ExhibitionDetails__short_info">
                    <ExhibitionDetailsDates dates={dates} />
                    {
                        timeStart
                            ? <div className="ExhibitionDetails__time-start">Начало в {timeSecondsCutter(timeStart)} по МСК</div>
                            : null

                    }
                    {
                        city
                            ? <div
                                className="ExhibitionDetails__place-icon">г. {city}, {address}</div>
                            : null
                    }
                </div>
            </div>
            <table className="ExhibitionDetails__attrs-table">
                <tbody>
                    {/*<tr>
                        <td>Класс:</td>
                        <td><ExhibitionClassTypes classTypesIds={class_types} /></td>
                    </tr>*/}
                    <tr>
                        <td>Ранг:</td>
                        <td><ExhibitionRankType rank_types={rank_types} /></td>
                    </tr>
                    <tr>
                        <td>Породы:</td>
                        <td><ExhibitionBreedTypes breedTypesIds={breed_types} /></td>
                    </tr>
                </tbody>
            </table>
            <CountDown eventDate={dates && transformDateSafariFriendly(dates[0])} />
        </div>
    )
}