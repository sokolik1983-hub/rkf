import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getContest = makeActionCreator(actionTypes.GET_SCHEDULE, 'exhibition_id');
export const getContestSuccess = makeActionCreator(actionTypes.GET_SCHEDULE_SUCCESS, 'data');
export const getContestFailed = makeActionCreator(actionTypes.GET_SCHEDULE_FAILED, 'errors');


export const addDateSuccess = makeActionCreator(actionTypes.DATE_ADD_SUCCESS, 'data');
export const updateDateSuccess = makeActionCreator(actionTypes.DATE_UPDATE_SUCCESS, 'id', 'data');


export const deleteContestDate = makeActionCreator(actionTypes.DATE_DELETE, 'id');
export const deleteContestDateSuccess = makeActionCreator(actionTypes.DATE_DELETE_SUCCESS, 'id');
export const deleteContestDateFailed = makeActionCreator(actionTypes.DATE_DELETE_FAILED, 'id', 'errors');


export const addContestEventSuccess = makeActionCreator(actionTypes.EVENT_ADD_SUCCESS, 'data');

export const updateContestEventSuccess = makeActionCreator(actionTypes.EVENT_UPDATE_SUCCESS, 'id', 'data');


export const deleteContestEvent = makeActionCreator(actionTypes.EVENT_DELETE, 'id', 'day');
export const deleteContestEventSuccess = makeActionCreator(actionTypes.EVENT_DELETE_SUCCESS, 'id', 'day');
export const deleteContestEventFailed = makeActionCreator(actionTypes.EVENT_DELETE_FAILED, 'id', 'day', 'errors');