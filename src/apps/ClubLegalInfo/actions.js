import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getLegalInfo = makeActionCreator(actionTypes.GET_LEGAL_INFO, 'id');
export const getLegalInfoSuccess = makeActionCreator(actionTypes.GET_LEGAL_INFO_SUCCESS, 'data');
export const getLegalInfoFailed = makeActionCreator(actionTypes.GET_LEGAL_INFO_FAILED, 'errors');

export const updateLegalInfo = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO, 'id');
export const updateLegalInfoSuccess = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_SUCCESS, 'data');
export const updateLegalInfoFailed = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_FAILED, 'errors');