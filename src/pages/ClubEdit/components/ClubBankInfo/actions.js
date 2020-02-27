import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getBankInfoSuccess = makeActionCreator(actionTypes.GET_BANK_INFO_SUCCESS, 'data');
export const updateBankInfoSuccess = makeActionCreator(actionTypes.UPDATE_BANK_INFO_SUCCESS, 'data');
