import * as actiontypes from './actiontypes';
import {combineReducers} from "redux";
import {normalizeList} from 'shared/normilizers'
import createReducer from 'utils/createReducer'

const homePageExhibitionsInitialState = {
    list: [],
};

const homePageNewsInitialState = {
    listCollection: {},
    listIds: []
};

const homePageClubInitialState = {
    route: '',
    contacts: [],
    documents: [],
    common: {}
};


const exhibitions = createReducer(homePageExhibitionsInitialState, {
    [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
        return {
            ...state,
            list: action.data
        };
    },
});

const news = createReducer(homePageNewsInitialState, {
    [actiontypes.GET_NEWS_SUCCESS](state, action) {
        const {entities, result: listIds} = normalizeList(action.data);
        return {
            ...state,
            listIds,
            listCollection: entities.listCollection
        };
    },
});

const club = createReducer(homePageClubInitialState, {
    [actiontypes.GET_COMMON_SUCCESS](state, action) {
        const {documents, contacts, ...common} = action.data;
        const {shortcut_route_name: route} = common;
        return {
            ...state,
            route,
            documents,
            contacts,
            common
        };
    },
});


const homePageReducer = combineReducers({
    exhibitions,
    news,
    club,
});


export default homePageReducer;