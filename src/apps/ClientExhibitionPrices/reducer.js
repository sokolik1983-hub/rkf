import * as actiontypes from './actiontypes';
import {normalizeList} from 'shared/normilizers'


const clientExhibitionPricesInitialState = {
    loading: false,
    listCollection: {},
    listIds: []
};

export default function clientExhibitionPricesReducer(state = clientExhibitionPricesInitialState, action) {

    switch (action.type) {

        case actiontypes.CLEAR_REQUEST_ERRORS: {
            return {
                ...state,
                requestErrors: {},
            }
        }
        case actiontypes.ADD_SUCCESS: {
            const {data} = action;
            const listCollection = {...state.listCollection};
            listCollection[String(data.id)] = data;
            const listIds = [...state.listIds, data.id];
            return {
                ...state,
                listCollection,
                listIds
            }
        }
        case actiontypes.GET_LIST_SUCCESS: {
            const {entities, result: listIds} = normalizeList(action.data);
            return {
                ...state,
                listIds,
                listCollection: entities.listCollection
            }
        }

        default:
            return state;
    }
}
