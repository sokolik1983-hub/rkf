import * as actionTypes from "./actiontypes";
import {makeActionCreator} from "../../utils";

export const loginUserSuccess = makeActionCreator(actionTypes.LOGIN_SUCCESS, 'data');
export const logOutUser = makeActionCreator(actionTypes.LOGOUT);
export const updateUserInfo = makeActionCreator(actionTypes.UPDATE_USER_INFO, 'data');
