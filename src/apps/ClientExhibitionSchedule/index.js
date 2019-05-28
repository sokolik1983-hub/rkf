import React, {Component} from "react";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import ScheduleDayList from './containers/Day/List'

import {defaultReduxKey} from './config'
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";

import injectSaga from "utils/injectSaga";
import saga from "./saga";

import {getSchedule} from "./actions";


class ClientExhibitionScheduleProxy extends Component {

    componentDidMount() {
        this.props.getSchedule()
    }

    render() {
        return (
            <div className="schedule">
                <ScheduleDayList exhibition_id={12}/>
            </div>
        );
    }
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
const withSaga = injectSaga({key: defaultReduxKey, saga});


const mapDispatchToProps = dispatch => bindActionCreators({
    getSchedule,
}, dispatch);


const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(ClientExhibitionScheduleProxy)