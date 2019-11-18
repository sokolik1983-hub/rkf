import React from 'react'
import ExhibitionSchedule from 'apps/ExhibitionSchedule'
import Tabs, { TabContent } from "components/Tabs";
import Img from 'components/Img'
import DetailsContent from "../DetailsContent";
import ExhibitionDocuments from 'apps/ExhibitionDocuments';

export default function ExhibitionDetailsContent({
    id,
    exhibition_avatar_link,
    description,
    referees_id,
    exhibition_map_link,
}) {
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : '/static/images/exhibitions/default.png';

    return (
        <DetailsContent>

            <div className="ExhibitionDetails__avatar">
                <Img src={avatarLink} />
            </div>



            <Tabs className="exhibition-details__tabs">

                <TabContent label="Описание">

                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </TabContent>
                {/* <TabContent label="Конкурсы">
                    <ExhibitionContests exhibitionId={id} />
                </TabContent>
                <TabContent label="Судьи">
                    <ExhibitionReferees
                        refereesIds={referees_id}
                    />
                </TabContent> */}
                <TabContent label="Расписание">
                    {id && <ExhibitionSchedule exhibitionId={id} />}
                </TabContent>
                <TabContent label="Документы">
                    {id && <ExhibitionDocuments exhibitionId={id} />}
                </TabContent>

                {/*<TabContent label="Участники">Участники</TabContent>*/}

            </Tabs>
        </DetailsContent>
    )
}