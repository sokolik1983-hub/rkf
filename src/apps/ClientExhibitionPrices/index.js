import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import Card from 'components/Card';
import ScheduleDayList from './containers/Day/List'

import {defaultReduxKey} from './config'
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";

import injectSaga from "utils/injectSaga";
import saga from "./saga";

import {getSchedule} from "./actions";


class ClientExhibitionScheduleProxy extends Component {

    componentDidMount() {
        const {exhibitionId, getSchedule} = this.props;
        getSchedule(exhibitionId)
    }

    render() {
        return (
            <Card lg>
                <h3 className="text-upper">Расписание выставки</h3>
                <ScheduleDayList
                    exhibitionId={this.props.exhibitionId}
                />
            </Card>
        );
    }
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
const withSaga = injectSaga({key: defaultReduxKey, saga});


const mapDispatchToProps = dispatch => bindActionCreators({
    getSchedule,
}, dispatch);

const mapsStateToProps = (state, props) => {
    if (props.match !== undefined) {
        const {id} = props.match.params;
        return {exhibitionId: id}
    }
    return {}
}
const withConnect = connect(
    mapsStateToProps,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(ClientExhibitionScheduleProxy)