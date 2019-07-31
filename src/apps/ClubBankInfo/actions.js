import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getBankInfo = makeActionCreator(actionTypes.GET_LEGAL_INFO, 'id');
export const getBankInfoSuccess = makeActionCreator(actionTypes.GET_LEGAL_INFO_SUCCESS, 'data');
export const getBankInfoFailed = makeActionCreator(actionTypes.GET_LEGAL_INFO_FAILED, 'errors');

export const updateBankInfo = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO, 'id');
export const updateBankInfoSuccess = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_SUCCESS, 'data');
export const updateBankInfoFailed = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_FAILED, 'errors');