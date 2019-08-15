import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getLegalInfoSuccess = makeActionCreator(actionTypes.GET_LEGAL_INFO_SUCCESS, 'data');
export const updateLegalInfoSuccess = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_SUCCESS, 'data');
