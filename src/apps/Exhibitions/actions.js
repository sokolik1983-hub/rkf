import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');


export const fetchExhibitions = makeActionCreator(actionTypes.GET_EXHIBITIONS, 'params');
export const fetchExhibitionsSuccess = makeActionCreator(actionTypes.GET_EXHIBITIONS_SUCCESS, 'data');
export const fetchExhibitionsFailed = makeActionCreator(actionTypes.GET_EXHIBITIONS_FAILED, 'errors');


export const getDetails = makeActionCreator(actionTypes.GET_EXHIBITION_DETAILS, 'id');
export const getDetailsSuccess = makeActionCreator(actionTypes.GET_EXHIBITION_DETAILS_SUCCESS, 'data');
export const getDetailsFailed = makeActionCreator(actionTypes.GET_EXHIBITION_DETAILS_FAILED, 'errors');

export const storePrices = makeActionCreator(actionTypes.STORE_PRICES, 'data');