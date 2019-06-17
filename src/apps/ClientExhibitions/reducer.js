import * as actiontypes from './actiontypes';
import {normalizeExhibitionList} from './normalize'

const clientInitialState = {
    loadingApi: false,
    exhibitionIdList: [],
    exhibitions: {},
    exhibitionsDetails: {},
    requestErrors: {},
    listDays: []
};

export default function clientExhibitionsReducer(state = clientInitialState, action) {

    switch (action.type) {

        case actiontypes.GET_LIST: {
            return {
                ...state,
                loading: true,
            };
        }
        // case actiontypes.GET_LIST_SUCCESS: {
        //     const {entities, result: exhibitionIdList} = normalizeExhibitionList(action.data)
        //     const {exhibitions} = entities;
        //     return {
        //         ...state,
        //         loading: false,
        //         exhibitions,
        //         exhibitionIdList,
        //         listDays: action.data,
        //     };
        // }
        case actiontypes.GET_LIST_SUCCESS: {
            const {entities, result: exhibitionIdList} = normalizeExhibitionList(action.data)
            const {exhibitions} = entities;
            return {
                ...state,
                loading: false,
                exhibitions,
                exhibitionIdList,
            };
        }
        case actiontypes.GET_LIST_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }
        case actiontypes.ADD: {
            return {
                ...state,
                loading: true,
            };
        }

        case actiontypes.ADD_SUCCESS: {
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
        }
        case actiontypes.ADD_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }
        case actiontypes.DETAILS_SUCCESS: {
            const {id} = action.data;
            const exhibitionsDetails = {...state.exhibitionsDetails};
            exhibitionsDetails[id.toString()] = action.data;
            return {
                ...state,
                loading: false,
                exhibitionsDetails,
            };
        }
        default:
            return state;
    }
}
