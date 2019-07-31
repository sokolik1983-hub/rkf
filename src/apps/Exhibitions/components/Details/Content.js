import React from 'react'
import ExhibitionSchedule from 'apps/ExhibitionSchedule'
import DetailImage from "../DetailsImage";
import Tabs, {TabContent} from "components/Tabs";

import DetailsContent from "../DetailsContent";
import ExhibitionReferees from './Referees'

import {useDictionary, getDictElement, getDictElementsArray} from 'apps/Dictionaries'

// address: "Naberezhnaya Leonova 66 -143"
// breed_types: [1, 2]
// city_id: 121
// class_types: [1, 2]
// club_id: 14
// description: "Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород Межрегиональная выставка всех пород "
// dignity_types: [2, 3]
// id: 26
// name: "Межрегиональная выставка всех пород"
// rank_type: 4
// referees_id: [1, 4]


export default function ExhibitionDetailsContent({
                                                     id,
                                                     images = [],
                                                     description,
                                                     referees_id,
                                                 }) {
    return (
        <DetailsContent>
            {
                images.length > 0 ?
                    images.map(image => <DetailImage key={image.url} url={image.url}/>)
                    : null
            }

            <Tabs className="exhibition-details__tabs">

                <TabContent label="Описание">

                    <div dangerouslySetInnerHTML={{__html: description}}/>
                </TabContent>
                <TabContent label="Расписание">
                    {id && <ExhibitionSchedule exhibitionId={id}/>}
                </TabContent>
                <TabContent label="Судьи">
                    <h3>Судьи</h3>
                    <ExhibitionReferees
                        refereesIds={referees_id}
                    />
                </TabContent>
                <TabContent label="Участники">Участники</TabContent>
                <TabContent label="Конкурсы">Конкурсы</TabContent>
            </Tabs>

        </DetailsContent>
    )
}