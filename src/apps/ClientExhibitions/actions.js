import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');
//TODO Remove this shit 001
export const getExhibitionList = makeActionCreator(actionTypes.GET_LIST,'user_id');
export const getExhibitionListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const getExhibitionListFailed = makeActionCreator(actionTypes.GET_LIST_FAILED, 'errors');

export const getExhibitionDetails = makeActionCreator(actionTypes.DETAILS, 'id');
export const getExhibitionDetailsSuccess = makeActionCreator(actionTypes.DETAILS_SUCCESS, 'data');
export const getExhibitionDetailsFailed = makeActionCreator(actionTypes.DETAILS_FAILED, 'id', 'errors');

export const addExhibitionSuccess = makeActionCreator(actionTypes.ADD_SUCCESS, 'data');


export const updateExhibition = makeActionCreator(actionTypes.UPDATE, 'id', 'data');
export const updateExhibitionSuccess = makeActionCreator(actionTypes.UPDATE_SUCCESS, 'data');


export const deleteExhibition = makeActionCreator(actionTypes.DELETE,'id');
export const deleteExhibitionSuccess = makeActionCreator(actionTypes.DELETE_SUCCESS,'id');
export const deleteExhibitionFailed = makeActionCreator(actionTypes.DELETE_FAILED, 'id', 'errors');

export const clearRequestErrors = makeActionCreator(actionTypes.CLEAR_ERRORS, 'id', 'errors');

export const addAvatarSuccess = makeActionCreator(actionTypes.ADD_AVATAR_SUCCESS, 'data');
export const deleteAvatarSuccess = makeActionCreator(actionTypes.ADD_AVATAR_SUCCESS, 'data');

export const addMapSuccess = makeActionCreator(actionTypes.ADD_MAP_SUCCESS, 'data');
export const deleteMapSuccess = makeActionCreator(actionTypes.DELETE_MAP_SUCCESS, 'data');


