import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    getDatesIds,
    getScheduleEvents,
    getItemById,
    getExhibitionId,
    selectScheduleDateProps
} from './selectors'

import {
    addScheduleEventSuccess,
    addDateSuccess,
    deleteScheduleEvent,
    updateScheduleEventSuccess, getSchedule
} from './actions'



export const connectScheduleDate = connect(selectScheduleDateProps);


export const connectScheduleDateList = connect(
    getDatesIds,
    dispatch => bindActionCreators({
        addDateSuccess
    }, dispatch)
);

export const connectScheduleEditableEvent = connect(
    getItemById,
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

export const connectClientExhibitionScheduleProxy = connect(
    getExhibitionId,
    dispatch => bindActionCreators({
        getSchedule,
    }, dispatch),
)