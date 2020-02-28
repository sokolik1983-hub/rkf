import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubContactsListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const addClubContactSuccess = makeActionCreator(actionTypes.ADD_CONTACT_SUCCESS, 'data');
export const updateClubContactSuccess = makeActionCreator(actionTypes.UPDATE_CONTACT_SUCCESS, 'data');
export const deleteClubContactSuccess = makeActionCreator(actionTypes.DELETE_CONTACT_SUCCESS, 'data');
