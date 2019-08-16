import * as actiontypes from './actiontypes';
import createReducer from "utils/createReducer";
import {normalizeList} from 'shared/normilizers'
import {normalizeExhibitionsList} from './normalize'

const exhibitionsInitialState = {
    listCollection: {},
    listIds: [],
    //
    dates: [],
    exhibitionsDetails: {},
    breed_ids: [],
    city_ids: [],
};


const clientExhibitionsReducer = createReducer(exhibitionsInitialState, {

    [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
        const {exhibitions, city_ids, breed_ids} = action.data;
        return {
            ...state,
            dates: exhibitions,
            city_ids,
            breed_ids
        }
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
});

export default clientExhibitionsReducer;