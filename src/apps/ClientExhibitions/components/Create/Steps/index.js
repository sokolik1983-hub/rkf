import React, {Fragment} from 'react'
import Tabs, {TabContent} from "components/CommonTabs";
import FirstStepForm from 'apps/ClientExhibitions/components/Forms/FirstStepForm'
import SecondStepForm from 'apps/ClientExhibitions/components/Forms/SecondStepForm'
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
                <FirstStepForm/>
            </TabContent>
            <TabContent
                tabContent={
                    <Fragment>
                        Основаня иформация<br/>
                        <span className="step__number">шаг 1</span>
                    </Fragment>
                }>
                <SecondStepForm/>
            </TabContent>
            <TabContent
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
