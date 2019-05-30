import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getSchedule = makeActionCreator(actionTypes.GET_SCHEDULE, 'exhibition_id');
export const getScheduleSuccess = makeActionCreator(actionTypes.GET_SCHEDULE_SUCCESS, 'data');
export const getScheduleFailed = makeActionCreator(actionTypes.GET_SCHEDULE_FAILED, 'errors');

export const addDay = makeActionCreator(actionTypes.DAY_ADD, 'data');
export const addDaySuccess = makeActionCreator(actionTypes.DAY_ADD_SUCCESS, 'data');
export const addDayFailed = makeActionCreator(actionTypes.DAY_ADD_FAILED, 'errors');

export const updateDay = makeActionCreator(actionTypes.DAY_UPDATE, 'id', 'data');
export const updateDaySuccess = makeActionCreator(actionTypes.DAY_UPDATE_SUCCESS, 'id', 'data');
export const updateDayFailed = makeActionCreator(actionTypes.DAY_UPDATE_FAILED, 'id', 'errors');

export const deleteDay = makeActionCreator(actionTypes.DAY_DELETE, 'id');
export const deleteDaySuccess = makeActionCreator(actionTypes.DAY_DELETE_SUCCESS, 'id');
export const deleteDayFailed = makeActionCreator(actionTypes.DAY_DELETE_FAILED, 'id', 'errors');


export const addDayItem = makeActionCreator(actionTypes.DAY_ITEM_ADD, 'data');
export const addDayItemSuccess = makeActionCreator(actionTypes.DAY_ITEM_ADD_SUCCESS, 'data');
export const addDayItemFailed = makeActionCreator(actionTypes.DAY_ITEM_ADD_FAILED, 'errors');

export const updateDayItem = makeActionCreator(actionTypes.DAY_ITEM_UPDATE, 'id', 'data');
export const updateDayItemSuccess = makeActionCreator(actionTypes.DAY_ITEM_UPDATE_SUCCESS, 'id', 'data');
export const updateDayItemFailed = makeActionCreator(actionTypes.DAY_ITEM_UPDATE_FAILED, 'id', 'errors');


export const deleteDayItem = makeActionCreator(actionTypes.DAY_ITEM_DELETE, 'id');
export const deleteDayItemSuccess = makeActionCreator(actionTypes.DAY_ITEM_DELETE_SUCCESS, 'id');
export const deleteDayItemFailed = makeActionCreator(actionTypes.DAY_ITEM_DELETE_FAILED, 'id', 'errors');