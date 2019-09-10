import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getExhibitionDocumentsListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const addExhibitionDocumentSuccess = makeActionCreator(actionTypes.ADD_DOCUMENT_SUCCESS, 'data');
export const updateExhibitionDocumentSuccess = makeActionCreator(actionTypes.UPDATE_DOCUMENT_SUCCESS, 'data');
export const deleteExhibitionDocumentSuccess = makeActionCreator(actionTypes.DELETE_DOCUMENT_SUCCESS, 'data');
