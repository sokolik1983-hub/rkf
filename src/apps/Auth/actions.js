import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const loginUser = makeActionCreator(actionTypes.LOGIN, 'data');
export const loginUserSuccess = makeActionCreator(actionTypes.LOGIN_SUCCESS, 'data');
export const loginUserFailed = makeActionCreator(actionTypes.LOGIN_FAILED, 'errors');

export const logOutUser = makeActionCreator(actionTypes.LOGOUT);
export const logOutUserSuccess = makeActionCreator(actionTypes.LOGOUT_SUCCESS, );
export const logOutUserFailed = makeActionCreator(actionTypes.LOGOUT_FAILED, 'errors');

export const clearRequestErrors = makeActionCreator(actionTypes.CLEAR_REQUEST_ERRORS);