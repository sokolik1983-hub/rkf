import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer';
import { normalizeList } from 'shared/normilizers';

const clubExhibitionDocumentsInitialState = {
    listCollection: {},
    listIds: []
};

const clubExhibitionDocumentsReducer = createReducer(
    clubExhibitionDocumentsInitialState,
    {
        [actiontypes.GET_LIST_SUCCESS](state, action) {
            const { entities, result: listIds } = normalizeList(action.data);
            return {
                ...state,
                listCollection: entities.listCollection,
                listIds
            };
        }
    }
);

export default clubExhibitionDocumentsReducer;
