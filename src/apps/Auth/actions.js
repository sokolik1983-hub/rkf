import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loginUserSuccess = makeActionCreator(actionTypes.LOGIN_SUCCESS, 'data');

export const logOutUser = makeActionCreator(actionTypes.LOGOUT);
export const logOutUserSuccess = makeActionCreator(actionTypes.LOGOUT_SUCCESS, ); //не используется
export const logOutUserFailed = makeActionCreator(actionTypes.LOGOUT_FAILED, 'errors'); //не используется
