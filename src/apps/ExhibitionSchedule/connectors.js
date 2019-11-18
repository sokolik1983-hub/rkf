import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    getDatesIds,
    getScheduleEvents,
    getEventById,
    selectScheduleDateProps
} from './selectors'

import {
    addScheduleEventSuccess,
    addDateSuccess,
    deleteScheduleEvent,
    updateScheduleEventSuccess,
    getSchedule
} from './actions'


export const connectScheduleDate = connect(
    selectScheduleDateProps,
    null);


export const connectScheduleDateList = connect(
    getDatesIds,
    dispatch => bindActionCreators({
        addDateSuccess
    }, dispatch)
);

export const connectScheduleEditableEvent = connect(
    getEventById,
    dispatch => bindActionCreators(
        {
            addScheduleEventSuccess,
            updateScheduleEventSuccess,
            deleteScheduleEvent,
        }, dispatch)
);

export const connectScheduleEventsList = connect(
    getScheduleEvents,
    dispatch => bindActionCreators(
        {
            addScheduleEventSuccess,
            updateScheduleEventSuccess,
            deleteScheduleEvent,
        }, dispatch)
);

export const connectExhibitionScheduleProxy = connect(
    null,
    dispatch => bindActionCreators({
        getSchedule,
    }, dispatch),
)