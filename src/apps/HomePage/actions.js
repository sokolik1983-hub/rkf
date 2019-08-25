import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'



export const getCommonSuccess = makeActionCreator(actionTypes.GET_COMMON_SUCCESS, 'data');
export const getExhibitionsSuccess = makeActionCreator(actionTypes.GET_EXHIBITIONS_SUCCESS, 'data');
export const storeExhibitions = makeActionCreator(actionTypes.STORE_EXHIBITIONS, 'data');
export const getNewsSuccess = makeActionCreator(actionTypes.GET_NEWS_SUCCESS, 'data');