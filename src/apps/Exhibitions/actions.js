import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const fetchExhibitionsSuccess = makeActionCreator(actionTypes.GET_EXHIBITIONS_SUCCESS, 'data');

export const getDetailsSuccess = makeActionCreator(actionTypes.GET_EXHIBITION_DETAILS_SUCCESS, 'data');

export const storePrices = makeActionCreator(actionTypes.STORE_PRICES, 'data');
