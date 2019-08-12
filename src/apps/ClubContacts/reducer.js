import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'
import {normalizeList} from "shared/normilizers";

const clubClubContactsInitialState = {
    listCollection: {},
    listIds: []
};

const clubClubContactsReducer = createReducer(clubClubContactsInitialState, {

    [actiontypes.GET_LIST_SUCCESS](state, action) {

        const {entities, result: listIds} = normalizeList(action.data);
         console.log(actiontypes.GET_LIST_SUCCESS, entities.listCollection, listIds);
        return {
            ...state,
            listCollection: entities.listCollection,
            listIds
        }
    },
    [actiontypes.ADD_CONTACT_SUCCESS](state, action) {
        const {data} = action;
        const listIds = [...state.listIds, data.id];
        const listCollection = {...state.listCollection};
        listCollection[String(data.id)] = data;
        return {
            ...state,
            listCollection,
            listIds
        }
    },

});

export default clubClubContactsReducer;
