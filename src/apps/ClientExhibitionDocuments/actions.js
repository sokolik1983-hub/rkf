import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getExhibitionDocuments = makeActionCreator(actionTypes.GET_LIST, 'clubId');
export const getExhibitionDocumentsSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const getExhibitionDocumentsFailed = makeActionCreator(actionTypes.GET_LIST_FAILED, 'errors');

export const addExhibitionDocuments = makeActionCreator(actionTypes.ADD_DOCUMENT, 'data');
export const addExhibitionDocumentsSuccess = makeActionCreator(actionTypes.ADD_DOCUMENT_SUCCESS, 'data');
export const addExhibitionDocumentsFailed = makeActionCreator(actionTypes.ADD_DOCUMENT_FAILED, 'errors');