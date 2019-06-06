import React from 'react'
import Tabs, {TabContent} from "components/CommonTabs";
import ExhibitionForm from 'apps/ClientExhibitions/containers/ExhibitionForm'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'
import './styles.scss'


export const StepTabContent1 = () =>
    <>
        Основная информация<br/>
        <span className="step__number">шаг 1</span>
    </>;
export const StepTabContent2 = () =>
    <>
        Расписание выставки<br/>
        <span className="step__number">шаг 2</span>
    </>;
export const StepTabContent3 = () =>
    <>
        Цены<br/>
        <span className="step__number">шаг 3</span>
    </>;

export default function Steps() {
    return (
        <Tabs className="client-exhibition-create">
            <TabContent
                tabContent={
                    <StepTabContent1/>
                }
            >
                <ExhibitionForm/>
            </TabContent>
            <TabContent
                disabled
                tabContent={
                     <StepTabContent2/>
                }>
                <ClientExhibitionSchedule/>
            </TabContent>
            <TabContent
                disabled
                tabContent={
                     <StepTabContent3/>
                }>
                step 3
            </TabContent>
        </Tabs>
    )
}
