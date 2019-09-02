import * as actiontypes from './actiontypes';
import {normalizeList} from "shared/normilizers";
import createReducer from 'utils/createReducer'

const clientNewsInitialState = {
    listCollection: {},
    listIds: [],
};

const clientExhibitionScheduleReducer = createReducer(clientNewsInitialState, {

    [actiontypes.GET_NEWS_SUCCESS](state, action) {
        if (action.data.length) {
            const {entities, result: listIds} = normalizeList(action.data);
            return {
                ...state,
                loading: false,
                listCollection: entities.listCollection,
                listIds
            };
        }
        return {
            ...state,
            loading: false,
        }
    },

    [actiontypes.ADD_ARTICLE_SUCCESS](state, action) {
        const {id} = action.data;
        const listCollection = {...state.listCollection};
        const listIds = [id, ...state.listIds];

        listCollection[String(id)] = action.data;

        return {
            ...state,
            listCollection,
            listIds,
            loading: false,
        }
    },

    [actiontypes.DELETE_ARTICLE_SUCCESS](state, action) {
        const {id} = action;
        const listCollection = {...state.listCollection};
        delete listCollection[String(id)];
        const listIds = state.listIds.filter(item => item !== id);

        return {
            ...state,
            listCollection,
            listIds,
            loading: false,
        }
    },
});

export default clientExhibitionScheduleReducer;
