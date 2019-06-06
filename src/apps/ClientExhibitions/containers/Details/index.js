import React, {Fragment, PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getExhibitionDetails} from "apps/ClientExhibitions/actions";
import {defaultReduxKey} from "apps/ClientExhibitions/config";

import NavTab, {NavTabs} from 'apps/ClientExhibitions/components/NavTab'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'
import {objectNotEmpty} from "utils/index";
import Common from 'apps/ClientExhibitions/containers/Details/Common'
import {StepTabContent1, StepTabContent2, StepTabContent3} from "apps/ClientExhibitions/components/Steps";


const Prices = () => <div><h3 style={{padding:40, textAlign:'center'}}>Страница в разработке</h3></div>

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
            //exhibitionsDetails,
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
                    <Route path={`${path}/prices`} component={Prices}/>
                    <div className="client-exhibition-details">details</div>
                </Switch>
            </Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    getExhibitionDetails
}, dispatch);

const mapsStateToProps = (state, props) => {
    const {path, url, params} = props.match;
    const {id} = params;
    const exhibitionsDetails = state[defaultReduxKey].exhibitionsDetails[id.toString()];
    return {
        path,
        url,
        exhibitionsDetails,
        exhibitionId: id
    }
};

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(ExhibitionDetails)