import React, {PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getExhibitionDetails} from "../actions";
import {defaultReduxKey} from "../config";
import Container from 'components/Layout/Container'
import NavTab, {NavTabs} from 'apps/ClientExhibitions/components/NavTab'
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'
import {objectNotEmpty} from "../../../utils";

const Common = () => <div>common</div>

const Prices = () => <div>prices</div>

class ExhibitionDetails extends PureComponent {
    componentDidMount() {
        const {id, exhibitionsDetails, getExhibitionDetails} = this.props;
        if (!objectNotEmpty(exhibitionsDetails)) {
            getExhibitionDetails(id)
        }
    }

    render() {
        const {url, path, exhibitionsDetails} = this.props;
        return (
            <Container pad>
                <NavTabs>
                    <NavTab to={`${url}/common`}>
                        Step 1
                    </NavTab>
                    <NavTab to={`${url}/schedule`}>Step 2</NavTab>
                    <NavTab to={`${url}/prices`}>Step 3</NavTab>
                </NavTabs>
                <Switch>
                    <Route path={`${path}/common`} component={Common}/>
                    <Route path={`${path}/schedule`} component={ClientExhibitionSchedule}/>
                    <Route path={`${path}/prices`} component={Prices}/>
                    <div className="client-exhibition-details">details</div>
                </Switch>
            </Container>
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
        exhibitionsDetails
    }
};

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(ExhibitionDetails)