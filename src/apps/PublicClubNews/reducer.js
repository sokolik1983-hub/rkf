import * as actiontypes from './actiontypes';
import {normalizeList} from 'shared/normilizers'
import createReducer from 'utils/createReducer'

const clientNewsInitialState = {
    loadingApi: false,
    listIds: [],
    listCollection: {},
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
});

export default clientExhibitionScheduleReducer;
