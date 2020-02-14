import * as actiontypes from './actiontypes';
import { combineReducers } from "redux";
import createReducer from 'utils/createReducer';

const homePageNewsInitialState = {
    articles_count: null,
    articles: [],
    current_page: 1,
    current_active_typ: null
};

const news = createReducer(homePageNewsInitialState, {
    [actiontypes.GET_NEWS_SUCCESS](state, action) {
        return {
            ...action.data
        };
    },
});

const homePageReducer = combineReducers({
    news
});

export default homePageReducer;