import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');


export const fetchHomePage = makeActionCreator(actionTypes.FETCH);
export const fetchHomePageSuccess = makeActionCreator(actionTypes.FETCH_SUCCESS, 'data');
export const fetchHomePageFailed = makeActionCreator(actionTypes.FETCH_FAILED, 'errors');


export const getExhibitionsSuccess = makeActionCreator(actionTypes.GET_EXHIBITIONS_SUCCESS, 'data');