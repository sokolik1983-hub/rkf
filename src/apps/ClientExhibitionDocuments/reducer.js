import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'
import {normalizeList} from "shared/normilizers";

const clubExhibitionDocumentsInitialState = {
    listCollection: {},
    listIds: []
};

const clubExhibitionDocumentsReducer = createReducer(clubExhibitionDocumentsInitialState, {

    [actiontypes.GET_LIST_SUCCESS](state, action) {

        const {entities, result: listIds} = normalizeList(action.data);
        return {
            ...state,
            listCollection: entities.listCollection,
            listIds
        }
    },
    [actiontypes.ADD_DOCUMENT_SUCCESS](state, action) {
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
    [actiontypes.UPDATE_DOCUMENT_SUCCESS](state, action) {
        const {data} = action;
        const listCollection = {...state.listCollection};
        listCollection[String(data.id)] = data;
        return {
            ...state,
            listCollection,
        }
    },

    [actiontypes.DELETE_DOCUMENT_SUCCESS](state, action) {
        const {id} = action.data;
        const listIds = state.listIds.filter(listId => String(listId) !== String(id));
        const listCollection = {...state.listCollection};
        delete listCollection[String(id)];
        return {
            ...state,
            listCollection,
            listIds
        }
    },

});

export default clubExhibitionDocumentsReducer;
