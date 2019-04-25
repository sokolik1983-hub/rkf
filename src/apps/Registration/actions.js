import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');


export const registerUser = makeActionCreator(actionTypes.REGISTER, 'data');
export const registerUserSuccess = makeActionCreator(actionTypes.REGISTER_SUCCESS, 'data');
export const registerUserFailed = makeActionCreator(actionTypes.REGISTER_FAILED, 'errors');

export const clearRequestErrors = makeActionCreator(actionTypes.CLEAR_REQUEST_ERRORS);