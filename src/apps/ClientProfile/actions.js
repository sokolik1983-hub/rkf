import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getProfile = makeActionCreator(actionTypes.GET_PROFILE, 'data');
export const getProfileSuccess = makeActionCreator(actionTypes.GET_PROFILE_SUCCESS, 'data');
export const getProfileFailed = makeActionCreator(actionTypes.GET_PROFILE_FAILED, 'errors');