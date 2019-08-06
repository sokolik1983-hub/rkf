import React, {PureComponent} from 'react'
import {Route, Switch} from 'react-router-dom'
import Card from 'components/Card'
import {objectNotEmpty} from "utils/index";
import NavTab, {NavTabs} from '../NavTab'
import {StepTabContent1, StepTabContent2, StepTabContent3} from "../Steps";
import ClientExhibitionPrices from 'apps/ClientExhibitionPrices'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'
import ClientExhibitionContests from 'apps/ClientExhibitionContest'

import {connectExhibitionDetails} from "apps/ClientExhibitions/connectors"
import UpdateExhibitionForm from 'apps/ClientExhibitions/components/Forms/UpdateForm'
import {ExhibitionAvatar, ExhibitionMap} from 'apps/ClientExhibitions/components/Images'

const Step2 = (props) =>
    <>
        <h3>Avatar</h3>
        <ExhibitionAvatar {...props}/>
        <h3>Map</h3>
        <ExhibitionMap {...props}/>
        <ClientExhibitionSchedule {...props}/>
        <ClientExhibitionContests {...props}/>
    </>;

class ExhibitionDetails extends PureComponent {
    componentDidMount() {
        const {exhibitionId, exhibitionsDetails, getExhibitionDetails} = this.props;
        if (!objectNotEmpty(exhibitionsDetails)) {
            getExhibitionDetails(exhibitionId)
        }
    }

    render() {
        const {
            url,
            path,
        } = this.props;

        return (
            <Card style={{marginTop: 40}} lg>
                <NavTabs>
                    <NavTab to={`${url}/common`}>
                        <StepTabContent1/>
                    </NavTab>
                    <NavTab to={`${url}/schedule`}>
                        <StepTabContent2/>
                    </NavTab>
                    <NavTab to={`${url}/prices`}>
                        <StepTabContent3/>
                    </NavTab>
                </NavTabs>
                <Switch>
                    <Route path={`${path}/common`} component={UpdateExhibitionForm}/>
                    <Route path={`${path}/schedule`} component={Step2}/>
                    <Route path={`${path}/prices`} component={ClientExhibitionPrices}/>
                </Switch>
            </Card>
        )
    }
}


export default connectExhibitionDetails(ExhibitionDetails);