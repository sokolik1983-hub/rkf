import * as actiontypes from './actiontypes';
import {normalizeExhibitionList} from './normalize'
import createReducer from 'utils/createReducer'

const clientInitialState = {
    loadingApi: false,
    exhibitionIdList: [],
    exhibitions: {},
    exhibitionsDetails: {},
    requestErrors: {},
    listDays: []
};

const clientExhibitionsReducer = createReducer(clientInitialState, {
    [actiontypes.GET_LIST](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    // [actiontypes.GET_LIST_SUCCESS](state, action) {
    //     const {entities, result: exhibitionIdList} = normalizeExhibitionList(action.data)
    //     const {exhibitions} = entities;
    //     return {
    //         ...state,
    //         loading: false,
    //         exhibitions,
    //         exhibitionIdList,
    //         listDays: action.data,
    //     };
    // },
    [actiontypes.GET_LIST_SUCCESS](state, action) {
        const {entities, result: exhibitionIdList} = normalizeExhibitionList(action.data);
        const {exhibitions} = entities;
        return {
            ...state,
            loading: false,
            exhibitions,
            exhibitionIdList,
        };
    },
    [actiontypes.GET_LIST_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        };
    },
    [actiontypes.ADD](state, action) {
        return {
            ...state,
            loading: true,
        };
    },

    [actiontypes.ADD_SUCCESS](state, action) {
        const {id} = action.data;
        const exhibitionIdList = [...state.exhibitionIdList, id];
        const exhibitions = {...state.exhibitions};
        exhibitions[id.toString()] = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        exhibitionsDetails[id.toString()] = action.data;
        return {
            ...state,
            exhibitionIdList,
            exhibitions,
            exhibitionsDetails,
            loading: false,
        };
    },
    [actiontypes.ADD_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        };
    },
    [actiontypes.DETAILS_SUCCESS](state, action) {
        const {id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        exhibitionsDetails[id.toString()] = action.data;
        return {
            ...state,
            loading: false,
            exhibitionsDetails,
        };
    },
});

export default clientExhibitionsReducer;