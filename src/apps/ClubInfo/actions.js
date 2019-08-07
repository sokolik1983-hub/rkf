import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubInfo = makeActionCreator(actionTypes.GET_CLUB_INFO, 'id');
export const getClubInfoSuccess = makeActionCreator(actionTypes.GET_CLUB_INFO_SUCCESS, 'data');
export const getClubInfoFailed = makeActionCreator(actionTypes.GET_CLUB_INFO_FAILED, 'errors');


export const updateClubInfoSuccess = makeActionCreator(actionTypes.UPDATE_SUCCESS, 'data');