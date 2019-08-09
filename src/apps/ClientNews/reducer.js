import * as actiontypes from './actiontypes';
import {normalizeNewList} from './normalize'
import createReducer from 'utils/createReducer'

const clientNewsInitialState = {
    loadingApi: false,
    news: {},
    newsIds: [],
};

const clientExhibitionScheduleReducer = createReducer(clientNewsInitialState, {
    [actiontypes.GET_NEWS](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_NEWS_SUCCESS](state, action) {
        if (action.data.length) {
            const {entities, result: newsIds} = normalizeNewList(action.data);
            const {news} = entities;
            return {
                ...state,
                loading: false,
                news,
                newsIds
            };
        }
        return {
            ...state,
            loading: false,
        }
    },

    [actiontypes.GET_NEWS_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
    [actiontypes.ADD_NEWS_SUCCESS](state, action) {
        const {id} = action.data;
        const news = {...state.news};
        const newsIds = [id, ...state.newsIds];
        news[id.toString()] = action.data;

        return {
            ...state,
            news,
            newsIds,
            loading: false,
        }
    },
    [actiontypes.DELETE_NEWS_SUCCESS](state, action) {
        const {id} = action;
        const news = {...state.news};
        delete news[String(id)];
        const newsIds = state.newsIds.filter(item => item !== id);

        return {
            ...state,
            news,
            newsIds,
            loading: false,
        }
    },
});

export default clientExhibitionScheduleReducer;
