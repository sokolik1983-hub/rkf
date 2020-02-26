import * as actionTypes from "./actiontypes";
import {makeActionCreator} from "../../utils";

export const loginUserSuccess = makeActionCreator(actionTypes.LOGIN_SUCCESS, 'data');
export const logOutUser = makeActionCreator(actionTypes.LOGOUT);
