import React, {PureComponent} from 'react'
import {Route, Switch} from 'react-router-dom'
import {objectNotEmpty} from "utils/index";
import NavTab, {NavTabs} from '../NavTab'
//import Common from './Common'
import {StepTabContent1, StepTabContent2, StepTabContent3} from "../Steps";
import ClientExhibitionPrices from 'apps/ClientExhibitionPrices'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'

import {connectExhibitionDetails} from "apps/ClientExhibitions/connectors"
import UpdateExhibitionForm from 'apps/ClientExhibitions/components/Forms/UpdateForm'

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
            <>
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
                    <Route path={`${path}/schedule`} component={ClientExhibitionSchedule}/>
                    <Route path={`${path}/prices`} component={ClientExhibitionPrices}/>
                </Switch>
            </>
        )
    }
}


export default connectExhibitionDetails(ExhibitionDetails);