import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getSchedule = makeActionCreator(actionTypes.GET_SCHEDULE, 'exhibition_id');
export const getScheduleSuccess = makeActionCreator(actionTypes.GET_SCHEDULE_SUCCESS, 'data');
export const getScheduleFailed = makeActionCreator(actionTypes.GET_SCHEDULE_FAILED, 'errors');


export const addDateSuccess = makeActionCreator(actionTypes.DATE_ADD_SUCCESS, 'data');
export const updateDateSuccess = makeActionCreator(actionTypes.DATE_UPDATE_SUCCESS, 'id', 'data');


export const deleteScheduleDate = makeActionCreator(actionTypes.DATE_DELETE, 'id');
export const deleteScheduleDateSuccess = makeActionCreator(actionTypes.DATE_DELETE_SUCCESS, 'id');
export const deleteScheduleDateFailed = makeActionCreator(actionTypes.DATE_DELETE_FAILED, 'id', 'errors');


export const addScheduleEventSuccess = makeActionCreator(actionTypes.EVENT_ADD_SUCCESS, 'data');

export const updateScheduleEventSuccess = makeActionCreator(actionTypes.EVENT_UPDATE_SUCCESS, 'id', 'data');


export const deleteScheduleEvent = makeActionCreator(actionTypes.EVENT_DELETE, 'id', 'date');
export const deleteScheduleEventSuccess = makeActionCreator(actionTypes.EVENT_DELETE_SUCCESS, 'id', 'date');
export const deleteScheduleEventFailed = makeActionCreator(actionTypes.EVENT_DELETE_FAILED, 'id', 'date', 'errors');