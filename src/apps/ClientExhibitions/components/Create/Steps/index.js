import React, {Fragment} from 'react'
import Tabs, {TabContent} from "components/CommonTabs";
import ExhibitionForm from 'apps/ClientExhibitions/containers/ExhibitionForm'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'
import './styles.scss'

export default function Steps() {
    return (
        <Tabs className="client-exhibition-create">
            <TabContent
                tabContent={
                    <Fragment>
                        Основаня иформация<br/>
                        <span className="step__number">шаг 1</span>
                    </Fragment>
                }
            >
                <ExhibitionForm/>
            </TabContent>
            <TabContent
                disabled
                tabContent={
                    <Fragment>
                        Основаня иформация<br/>
                        <span className="step__number">шаг 1</span>
                    </Fragment>
                }>
                <ClientExhibitionSchedule/>
            </TabContent>
            <TabContent
                disabled
                tabContent={
                    <Fragment>
                        Основаня иформация<br/>
                        <span className="step__number">шаг 1</span>
                    </Fragment>
                }>
                step 3
            </TabContent>
        </Tabs>
    )
}
