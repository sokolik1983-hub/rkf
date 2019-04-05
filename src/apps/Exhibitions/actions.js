import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');


export const fetchExhibitions = makeActionCreator(actionTypes.GET_EXHIBITIONS, 'params');
export const fetchExhibitionsSuccess = makeActionCreator(actionTypes.GET_EXHIBITIONS_SUCCESS, 'data');
export const fetchExhibitionsFailed = makeActionCreator(actionTypes.GET_EXHIBITIONS_FAILED, 'errors');