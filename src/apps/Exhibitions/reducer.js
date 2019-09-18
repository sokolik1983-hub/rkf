import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer';
import { normalizeList } from 'shared/normilizers';

const exhibitionsInitialState = {
    listCollection: {},
    listIds: [],
    //
    dates: [],
    exhibitionsDetails: {},
    breeds: [],
    cities: [],
    types: [],
    ranks: [],
    castes: [],
    exhibitionPrices: [],
    filter: {},
    page_count: 0,
    pageL_current: null,
    page_prev: null,
    page_next: 2
};

const clientExhibitionsReducer = createReducer(exhibitionsInitialState, {
    [actiontypes.GET_FILTERS_SUCCESS](state, action) {
        return {
            ...state,
            ...action.data
        };
    },
    [actiontypes.GET_EXHIBITIONS_DATES](state, action) {
        return {
            ...state,
            dates: action.data
        };
    },

    [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
        const { exhibitions, ...rest } = action.data;
        const { entities, result: listIds } = normalizeList(exhibitions);
        return {
            ...state,
            listIds,
            listCollection: entities.listCollection,
            ...rest
        };
    },

    [actiontypes.GET_SEARCH_SUCCESS](state, action) {
        const { exhibitions } = action.data;
        const { entities, result: listIds } = normalizeList(exhibitions);
        return {
            ...state,
            listIds,
            listCollection: entities.listCollection,
            page_count: null,
            pageL_current: null,
            page_prev: null,
            page_next: null
        };
    },

    [actiontypes.GET_EXHIBITION_DETAILS_SUCCESS](state, action) {
        const { data } = action;
        const { exhibitionsDetails } = state;
        exhibitionsDetails[String(data.id)] = data;
        return {
            ...state,
            loading: false,
            exhibitionsDetails
        };
    },
    [actiontypes.STORE_PRICES](state, action) {
        return {
            ...state,
            loading: false,
            exhibitionPrices: action.data
        };
    }
});

export default clientExhibitionsReducer;
