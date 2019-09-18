import * as actionTypes from './actiontypes';
import { makeActionCreator } from 'utils/index';

export const fetchExhibitionsSuccess = makeActionCreator(
    actionTypes.GET_EXHIBITIONS_SUCCESS,
    'data'
);

export const fetchDatesSuccess = makeActionCreator(
    actionTypes.GET_EXHIBITIONS_DATES,
    'data'
);

export const fetchFiltersSuccess = makeActionCreator(
    actionTypes.GET_FILTERS_SUCCESS,
    'data'
);

export const fetchSearchSuccess = makeActionCreator(
    actionTypes.GET_SEARCH_SUCCESS,
    'data'
);

export const getDetailsSuccess = makeActionCreator(
    actionTypes.GET_EXHIBITION_DETAILS_SUCCESS,
    'data'
);

export const storePrices = makeActionCreator(actionTypes.STORE_PRICES, 'data');
