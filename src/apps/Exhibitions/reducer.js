import * as actiontypes from './actiontypes';
import createReducer from "utils/createReducer";
import {normalizeExhibitionsList} from "./normalize";


const exhibitionsInitialState = {
    loadingApi: false,
    exhibitions: {},
    exhibitionsIds: [],
    exhibitionsDetails: {},
};


const clientExhibitionsReducer = createReducer(exhibitionsInitialState, {
    [actiontypes.GET_EXHIBITIONS](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
        if (action.data.length) {
            const {entities, result: exhibitionsIds} = normalizeExhibitionsList(action.data);
            const {exhibitions} = entities;
            return {
                ...state,
                loading: false,
                exhibitions,
                exhibitionsIds
            };
        }
        return {
            ...state,
            loading: false,
        }
    },

    [actiontypes.GET_EXHIBITIONS_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
    [actiontypes.GET_EXHIBITION_DETAILS](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_EXHIBITION_DETAILS_SUCCESS](state, action) {
        const {data} = action;
        const {exhibitionsDetails} = state;
        exhibitionsDetails[String(data.id)] = data;
        return {
            ...state,
            loading: false,
            exhibitionsDetails
        }
    },

    [actiontypes.GET_EXHIBITION_DETAILS_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
});

export default clientExhibitionsReducer;