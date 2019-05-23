import React, {Fragment} from 'react'
import Tabs, {TabContent} from "components/CommonTabs";
import FirstStepFormFields from 'apps/ClientExhibitions/components/Forms/FirstStepForm'

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
                <FirstStepFormFields/>
            </TabContent>
            <TabContent
                tabContent={
                    <Fragment>
                        Основаня иформация<br/>
                        <span className="step__number">шаг 1</span>
                    </Fragment>
                }>
                step 2
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
