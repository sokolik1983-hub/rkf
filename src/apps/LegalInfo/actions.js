import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getLegalInfo = makeActionCreator(actionTypes.GET_CLUB_INFO, 'id');
export const getLegalInfoSuccess = makeActionCreator(actionTypes.GET_CLUB_INFO_SUCCESS, 'data');
export const getLegalInfoFailed = makeActionCreator(actionTypes.GET_CLUB_INFO_FAILED, 'errors');