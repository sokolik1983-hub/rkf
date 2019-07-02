import React from 'react'
import {StepTabContent1, StepTabContent2, StepTabContent3} from '../Steps'
import Tabs, {TabContent} from "components/CommonTabs";
import CreateExhibitionForm from '../Forms/CreateForm'

export default function ExhibitionCreate() {

    return (
        <Tabs className="client-exhibition-create">
            <TabContent tabContent={<StepTabContent1/>}>

                <CreateExhibitionForm/>

            </TabContent>
            <TabContent tabContent={<StepTabContent2/>} disabled/>
            <TabContent tabContent={<StepTabContent3/>} disabled/>
        </Tabs>
    )
}