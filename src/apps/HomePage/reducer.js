import * as actiontypes from './actiontypes';
import {combineReducers} from "redux";
import {normalizeList} from 'shared/normilizers'
import createReducer from 'utils/createReducer'
import {normalizeExhibitionList} from "../ClientExhibitions/normalize";

const homePageExhibitionsInitialState = {
    listCollection: {},
    listIds: []
};

const homePageNewsInitialState = {
    listCollection: {},
    listIds: []
};

const homePageClubInitialState = {
    listCollection: {},
    listIds: []
};


const exhibitions = createReducer(homePageExhibitionsInitialState, {
    [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
        const {exhibitions}=action.data;
        const {entities, result:listIds} = normalizeList(exhibitions);
        return {
            ...state,
            listIds,
            listCollection: entities.listCollection
        };
    },
});

const news = createReducer(homePageNewsInitialState, {
    [actiontypes.GET_NEWS_SUCCESS](state, action) {
        const {entities, result:listIds} = normalizeList(action.data);
        return {
            ...state,
            listIds,
            listCollection: entities.listCollection
        };
    },
});

const club = createReducer(homePageClubInitialState, {
    [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
        const {data} = action;
        return {
            ...state,
            loading: true,
        };
    },
});


const homePageReducer = combineReducers({
    exhibitions,
    news,
    club,
});


export default homePageReducer;