import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getExhibitionList = makeActionCreator(actionTypes.GET_LIST);
export const getExhibitionListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const getExhibitionListFailed = makeActionCreator(actionTypes.GET_LIST_FAILED, 'errors');

export const getExhibitionDetails = makeActionCreator(actionTypes.DETAILS, 'id');
export const getExhibitionDetailsSuccess = makeActionCreator(actionTypes.DETAILS_SUCCESS, 'data');
export const getExhibitionDetailsFailed = makeActionCreator(actionTypes.DETAILS_FAILED, 'id', 'errors');

export const addExhibition = makeActionCreator(actionTypes.ADD, 'data','successRedirect');
export const addExhibitionSuccess = makeActionCreator(actionTypes.ADD_SUCCESS, 'data');
export const addExhibitionFailed = makeActionCreator(actionTypes.ADD_FAILED, 'errors');

export const updateExhibition = makeActionCreator(actionTypes.UPDATE, 'id', 'data');
export const updateExhibitionSuccess = makeActionCreator(actionTypes.UPDATE_SUCCESS, 'id', 'data');
export const updateExhibitionFailed = makeActionCreator(actionTypes.UPDATE_FAILED, 'id', 'errors');

export const deleteExhibition = makeActionCreator(actionTypes.DELETE,'id');
export const deleteExhibitionSuccess = makeActionCreator(actionTypes.DELETE_SUCCESS,'id');
export const deleteExhibitionFailed = makeActionCreator(actionTypes.DELETE_FAILED, 'id', 'errors');

export const clearRequestErrors = makeActionCreator(actionTypes.CLEAR_ERRORS, 'id', 'errors');