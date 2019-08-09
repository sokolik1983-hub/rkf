import React from 'react'
import ExhibitionSchedule from 'apps/ExhibitionSchedule'
import ExhibitionContests from 'apps/ExhibitionContest'
import Tabs, {TabContent} from "components/Tabs";
import Img from 'components/Img'
import DetailsContent from "../DetailsContent";
import ExhibitionReferees from './Referees'


export default function ExhibitionDetailsContent({
                                                     id,
                                                     exhibition_avatar_link,
                                                     description,
                                                     referees_id,
                                                 }) {
    return (
        <DetailsContent>

            {exhibition_avatar_link ?
                <div className="ExhibitionDetails__avatar">
                    <Img src={exhibition_avatar_link}/>
                </div> : null}

            <Tabs className="exhibition-details__tabs">

                <TabContent label="Описание">

                    <div dangerouslySetInnerHTML={{__html: description}}/>
                </TabContent>
                <TabContent label="Расписание">
                    {id && <ExhibitionSchedule exhibitionId={id}/>}
                </TabContent>
                <TabContent label="Судьи">
                    <ExhibitionReferees
                        refereesIds={referees_id}
                    />
                </TabContent>
                {/*<TabContent label="Участники">Участники</TabContent>*/}
                <TabContent label="Конкурсы">
                    <ExhibitionContests exhibitionId={id}/>
                </TabContent>
            </Tabs>

        </DetailsContent>
    )
}