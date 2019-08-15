import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubDocumentsListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const addClubDocumentSuccess = makeActionCreator(actionTypes.ADD_DOCUMENT_SUCCESS, 'data');
export const updateClubDocumentSuccess = makeActionCreator(actionTypes.UPDATE_DOCUMENT_SUCCESS, 'data');
export const deleteClubDocumentSuccess = makeActionCreator(actionTypes.DELETE_DOCUMENT_SUCCESS, 'data');
