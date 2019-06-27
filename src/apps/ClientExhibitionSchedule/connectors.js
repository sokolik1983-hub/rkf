import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getDatesIds, getScheduleEvents, getItemById} from 'apps/ClientExhibitionSchedule/selectors'

import {
    addScheduleEventSuccess,
    addDateSuccess,
    deleteScheduleEvent,
    updateScheduleEventSuccess
} from 'apps/ClientExhibitionSchedule/actions'

import {selectScheduleDateProps} from 'apps/ClientExhibitionSchedule/selectors'


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