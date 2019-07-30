import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubContacts = makeActionCreator(actionTypes.GET_LEGAL_INFO, 'id');
export const getClubContactsSuccess = makeActionCreator(actionTypes.GET_LEGAL_INFO_SUCCESS, 'data');
export const getClubContactsFailed = makeActionCreator(actionTypes.GET_LEGAL_INFO_FAILED, 'errors');

export const updateClubContacts = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO, 'id');
export const updateClubContactsSuccess = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_SUCCESS, 'data');
export const updateClubContactsFailed = makeActionCreator(actionTypes.UPDATE_LEGAL_INFO_FAILED, 'errors');