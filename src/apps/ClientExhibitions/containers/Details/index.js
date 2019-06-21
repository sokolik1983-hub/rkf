import React, {Fragment, PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Switch, Route} from 'react-router-dom'
import {objectNotEmpty} from "utils/index";
import NavTab, {NavTabs} from 'apps/ClientExhibitions/components/NavTab'
import ClientExhibitionPrices from 'apps/ClientExhibitionPrices'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'
import Common from 'apps/ClientExhibitions/containers/Details/Common'
import {StepTabContent1, StepTabContent2, StepTabContent3} from "apps/ClientExhibitions/components/Steps";

import {getExhibitionDetails} from "apps/ClientExhibitions/actions";
import {getExhibitionsDetailsById} from 'apps/ClientExhibitions/selectors'

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
            <Fragment>
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
                    <Route path={`${path}/common`} component={Common}/>
                    <Route path={`${path}/schedule`} component={ClientExhibitionSchedule}/>
                    <Route path={`${path}/prices`} component={ClientExhibitionPrices}/>
                </Switch>
            </Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    getExhibitionDetails
}, dispatch);

const mapStateToProps = (state, props) => ({...getExhibitionsDetailsById(state, props)})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExhibitionDetails)