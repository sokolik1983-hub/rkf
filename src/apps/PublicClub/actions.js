import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubSuccess = makeActionCreator(actionTypes.GET_CLUB_SUCCESS, 'data');
