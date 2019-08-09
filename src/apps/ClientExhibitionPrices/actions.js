import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const addExhibitionPrice = makeActionCreator(actionTypes.ADD, 'data');
export const addExhibitionPriceSuccess = makeActionCreator(actionTypes.ADD_SUCCESS, 'data');
export const addExhibitionPriceFailed = makeActionCreator(actionTypes.ADD_FAILED, 'errors');


export const getPriceListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');

export const clearRequestErrors = makeActionCreator(actionTypes.CLEAR_REQUEST_ERRORS);