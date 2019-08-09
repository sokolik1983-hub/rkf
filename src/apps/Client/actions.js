import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubInfoSuccess = makeActionCreator(actionTypes.GET_CLUB_INFO_SUCCESS, 'data');